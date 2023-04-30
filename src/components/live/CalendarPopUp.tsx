import React, { useState, useEffect } from "react";
import Popup from "./PopUp";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  TodayButton,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { axiosInstance } from "apis/axiosConfig";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberInfoState } from "recoil/userState";
import { scheduleSubscriptionState } from "recoil/scheduleSubscriptionState";

interface CalendarPopupProps {
  events: any[];
  handleClose: () => void;
}

export interface ScheduleSubscriptions {
  mentorName: string;
  userName: string;
  email: string;
  roomName: string;
  startTime: Date;
  subscribeId: number;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  events,
  handleClose,
}) => {
  const { memberInfo, memberId, isLoggedIn } = useRecoilValue(memberInfoState);

  const [currentDate, setCurrentDate] = useState(new Date()); // 시간 변수를 상태값으로 두어 변경 가능
  const [scheduleSubscriptions, setScheduleSubscriptions] = useRecoilState(
    scheduleSubscriptionState
  );

  const currentDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const CustomAppointment = (props: any) => {
    const handleEventClick = () => {
      if (props.data.mentorName === memberInfo.nickname) {
        // 직접 입력으로 추후 수정 필요
        alert("자신의 방에는 신청할 수 없습니다");
        handleClose();
      } else {
        // 현재 사용자의 포인트를 확인 후 30점 이상일때만 신청 진행
        if (window.confirm("해당 시간에 신청하시겠습니까?")) {
          if (memberInfo.point >= 30) {
            axiosInstance
              .post(`/api/register`, {
                scheduleId: props.data.scheduleId,
                menteeId: memberId,
                menteeName: memberInfo.nickname,
              })
              .then(async (res) => {
                if (res.status === 200) {
                  alert("신청이 완료되었습니다");

                  // 점수 차감 요청
                  await axiosInstance
                    .patch(`/api/member/point/decrease`, {
                      memberId: memberId,
                    })
                    .then((res) => {
                      console.log(res.data);
                    });

                  console.log(props);
                  // 스케쥴 푸시 알림 구독
                  await axiosInstance
                    .post(`/api/subscribe/schedule`, {
                      mentorName: props.data.mentorName,
                      userName: memberInfo.nickname,
                      email: memberInfo.email,
                      roomName: props.data.mentoringRoomTitle,
                      startTime: props.data.startDate,
                    })
                    .then((res) => {
                      console.log(res);
                      setScheduleSubscriptions(
                        (
                          prevScheduleSubscriptions: ScheduleSubscriptions[]
                        ) => {
                          const existingScheduleSubscription =
                            prevScheduleSubscriptions.find(
                              (sub: ScheduleSubscriptions) =>
                                sub.subscribeId === res.data.subscribeId
                            );

                          if (!existingScheduleSubscription) {
                            return [...prevScheduleSubscriptions, res.data];
                          }

                          return prevScheduleSubscriptions;
                        }
                      );
                    })
                    .catch((err) => console.log(err));

                  handleClose();
                  window.location.reload();
                } else {
                  alert(res.data["msg"]);
                }
              })
              .catch((err) => console.log(err));
          } else {
            alert(
              `${memberInfo.nickname} 회원님의 포인트가 부족하여 멘토링 신청이 불가합니다.`
            );
            return;
          }
          window.location.reload();
        }
      }
    };

    return <Appointments.Appointment {...props} onClick={handleEventClick} />;
  };

  return (
    <div className="calendarPopup">
      <div className="italic mb-4">
        해당 멘토링이 신청 가능한 시간대 목록입니다.
      </div>
      <Scheduler data={events} height={500}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <WeekView startDayHour={7} endDayHour={23} cellDuration={60} />{" "}
        {/* 한 시간 간격으로 변경 */}
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={CustomAppointment} />
      </Scheduler>
      <div className="flex justify-end">
        <button
          className="bg-accent-400 text-white px-3 py-2 rounded-md"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CalendarPopup;
