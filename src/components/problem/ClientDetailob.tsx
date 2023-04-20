import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import ProblemPointModal from "components/problem/ProblemPointModal";

interface ProblemBoxProps { 
  problemId: number; //>>
  nickname: string; //>>
  writer: string; //>>
  type: string; //>>
  views: number;  //>>
  title: string; //>>
  level: string; //>>
  likes: number; //>>
  content: string; //>>
  hashTag: string; //>>
  answer: string; //>>
  answerCandidate: string[]; // answerCandidate 추가  //>>
  solved: boolean; //>>

}

const ProblemDetail = () => {
  const { problemId, member } = useParams();
  const [detail, setDetail] = useState<ProblemBoxProps>();
  const [modalOpen, setModalOpen] = useState(false); //모달 오픈
  const [answer, setAnswer] = useState(''); //정답 저장 
  const [answerCandidate, setAnswerCandidate] = useState<string[]>([]); //문제 답안 목록 저장
  const [modalTitle, setModalTitle] = useState(''); //모달 타이틀 전송
  const [pointAdd , setPointAdd] = useState(0); // 포인트 -> 연산값이 실제로 연산된 후 보내져야한다.
  const [isEditing, setIsEditing] = useState(true); // 수정 모드인지 여부를 true로 변경
  const [radioDisabled, setRadioDisabled] = useState(false);
  const [originalAnswer, setOriginalAnswer] = useState(""); // 수정 모드 진입 시 기존 답변 저장
  const [problemSolved, setProblemSolved] = useState(false); // 문제 풀이 유무 DB저장을 위해서 만듦
  const [btnVisible, setBtnVisible]= useState(false); //문제 작성자는 문제 풀수없도록 하기 위한 속성===
  const [answerWriter, setAnswerWriter] = useState(''); //문제 작성자를 받아오기 위한값===
  const navigate = useNavigate(); 
  const [likes, setLikes] = useState(detail?.likes || 0);


  const sessionAnswer = sessionStorage.getItem('answer') || ''; // 값 null처리

  const openModal = () => {
    if (window.confirm("답안을 제출 하시겠습니까?")) {
      setModalOpen(true);
      }
  };

  const checkAnswer = () => {
    return answer === sessionAnswer; //session answer이랑 값 비교
  }

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/problem/68/Taeho`)
 
        // console.log(response);
        const answerCandidateString = response.data.data.answerCandidate;
        const answer = response.data.data.answer; //정답 저장

        setAnswer(answer);
        // console.log(answerCandidateString)
        const answerCandidateArray = answerCandidateString;
        // console.log(answerCandidateArray);
        setAnswerCandidate(answerCandidateArray);
        // console.log(setAnswerCandidate);

        setDetail(response.data.data);
        setAnswerWriter(response.data.data.writer);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message, "Code:", error.code);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };
    fetchProblemDetail();
  }, [problemId, member]);

  useEffect(() => {
    if (answerWriter === "lango") { //memberId받아오기
      setBtnVisible(false);
    } else {
      setBtnVisible(true);
    }
  }, [answerWriter]);
  

  if (!detail) {
    return <div>Loading...</div>;
  }

  const handleRadioClick = (candidate: string) => {
    console.log("Selected radio button index:", candidate);
    console.log(answer)
    // 여기에서 번호를 전송하거나 다른 작업을 수행할 수 있습니다.
    // 정답을 비교 후 모달 창으로 연산 포인트를 보낸다.
    if (candidate === answer) {
      console.log("정답처리"); // 추후 삭제 예정
      console.log(answer);
      setModalTitle("정답입니다!")
      setPointAdd(10);

    } else {
      console.log("오답처리")
      setModalTitle("오답입니다")
      setPointAdd(0);
    }
  };

  const handleEditing = () => {
    if (window.confirm("수정 하시겠습니까?")) {
    setIsEditing(true);
    setRadioDisabled(false); 
    // setOriginalAnswer(inputAnswer);
    // setInputAnswer(detail.answer);
    }
    };

  const handleSave = () => {
    setIsEditing(false);
    setRadioDisabled(true);
  };

  const handleLikeButtonClick = async () => {
    try {
      await axios.post(`http://localhost:9001/api/problem/3`);
      setLikes(likes + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message, "Code:", error.code);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <>
      <p>문제 번호: {detail.problemId}</p>
      <div className="flex justify-between items-center mb-3 ">
        <p>난이도: {detail.level}</p>
        <p>point</p>
      </div>
      <div className="flex justify-between items-center mb-3">
        <p>문제 유형: {detail.type}</p>
        <p>문제 해결 여부: {detail.solved ? '해결' : '미해결'}</p>
      </div>

      <div className=" bg-gray-200 px-20 py-10 rounded">
        <div className="mt-4">
          <div className="flex-container">
            <h2 className="text-lg font-medium leading-6 text-gray-900 bg-white rounded">제목: {detail.title}</h2>
          </div>
          <p className="bg-white rounded mt-4 ">작성자: {detail.writer}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500 bg-white rounded py-9">내용:{detail.content}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          보기
        </label>

        <div className="flex flex-col items-start space-y-2">
          {detail.answerCandidate.map((candidate: string, index: number) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option${index}`}
                name="answerCandidate"
                value={candidate}
                className="mr-2"
                onChange={() => handleRadioClick(candidate)} // Call the new function when a radio button is clicked
                disabled={radioDisabled}
              />
              <label htmlFor={`option${index}`} className="text-sm">
                {/* {index + 1}.  */}
                {candidate}

              </label>
            </div>
          ))}
        </div>

      </div>
      <p>조회수: {detail.views}</p>
      {detail && (
        <button
          className="py-2 px-4 bg-transparent text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
          onClick={handleLikeButtonClick}
        >
          좋아요: {likes}
        </button>
      )}
      <p>해시태그: {detail.hashTag}</p>

      <div>
        <>
      <div className="flex flex-col justify-center items-end">
        {isEditing ? (
          <div className="h-32 flex items-center">
            <button
              className="py-2 px-4 bg-transparent text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              onClick={handleSave}
            >
              저장
            </button>

          </div>
        ) : (
          <div className="flex flex-col justify-center items-end">
            <div className="h-32 flex items-center">
              <div>입력한 값과 일치여부: {checkAnswer() ? '일치' : '불일치'}</div>
              <button
                className="py-2 px-4 bg-transparent text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                onClick={handleEditing}
              >
                수정
              </button>
              <button
                className="py-2 px-4 bg-transparent text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                onClick={openModal}
              >
                문제 제출
              </button>
            </div>
            {modalOpen && (
              <ProblemPointModal
                title={modalTitle}
                point={pointAdd}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              />
            )}
          </div>
          ) 
        }
        </div>
        </>

      </div>
    </>
  );
};

export default ProblemDetail;