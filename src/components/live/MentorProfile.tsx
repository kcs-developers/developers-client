import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { subscriptionState } from "../../recoil/subscriptionState";
import { axiosInstance } from "apis/axiosConfig";
import { memberInfoState } from "recoil/userState";

interface MentorProfileProps {
  bio: string;
  name: string;
  roomName: string;
}

export interface Subscription {
  mentorName: string;
  userName: string;
  email: string;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ bio, name }) => {
  const { memberInfo, memberId } = useRecoilValue(memberInfoState);
  const [subscriptions, setSubscriptions] = useRecoilState(subscriptionState);
  const isSelf = memberInfo.nickname === name; // 본인 구독 불가
  const [subscribed, setSubscribed] = useState(false); // 알림 버튼 변경 state
  const [refreshKey, setRefreshKey] = useState(false); //강제리랜더링을 위한 값 생성

  // 구독 목륵을 불러와서 그에 해당하는 상태값 지정하기
  useEffect(() => {
    const fetchData = async () => {
      const subData = await getSubscriptions(memberInfo.nickname);
      setSubscribed(
        subData.some((sub: Subscription) => sub.mentorName === name)
      );
    };
    fetchData();
  }, [subscriptions, refreshKey]);

  const getSubscriptions = async (nickname: string) => {
    const response = await axiosInstance.get(
      `/api/subscriptions?userName=${nickname}`
    );
    return response.data;
  };

  // 이벤트 처리 함수를 수정하여 구독 및 구독 취소 시 엔드포인트가 정확하게 변경되도록 함
  const handleSubscription = async () => {
    if (isSelf) {
      alert("본인 구독 불가!");
      return;
    }

    // 일반 푸시 엔드포인트
    const endpoint = subscribed ? `/api/unsubscribe` : `/api/subscribe`;

    const notifybody = subscribed
      ? {
          mentorName: name,
          userName: memberInfo.nickname,
        }
      : {
          mentorName: name,
          userName: memberInfo.nickname,
          email: memberInfo.email,
        };

    // 일반 푸시 알림 요청
    await axiosInstance({
      url: `${endpoint}`,
      data: notifybody,
      method: subscribed ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSubscriptions((prevSubscriptions: Subscription[]) => {
          if (subscribed) {
            return prevSubscriptions.filter(
              (sub: Subscription) =>
                !(
                  sub.mentorName === res.data.mentorName &&
                  sub.userName === res.data.userName
                )
            );
          } else {
            const existingSubscription = prevSubscriptions.find(
              (sub: Subscription) =>
                sub.mentorName === res.data.mentorName &&
                sub.userName === res.data.userName
            );

            if (!existingSubscription) {
              return [...prevSubscriptions, res.data];
            }
          }
          return prevSubscriptions;
        });
        setSubscribed(!subscribed);
        setRefreshKey(!refreshKey);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mentorProfile">
      <div className="flex items-center mb-2">
        {/* <img className="border border-black rounded" src={imgUrl} alt="Mentor" width={70} height={70}/> */}
        <h3 className="text-xl pb-1">{name}</h3>
        {!isSelf && memberId && (
          <button
            className="bg-accent-400 text-slate-200 px-3 py-2 mx-2 rounded"
            onClick={handleSubscription}
          >
            {subscribed ? "알림 취소" : "알림"}
          </button>
        )}
      </div>
      {/* <h2>멘토 연혁</h2>
      <p>{bio}</p> */}
    </div>
  );
};

export default MentorProfile;
