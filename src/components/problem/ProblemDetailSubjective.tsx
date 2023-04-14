import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemPointModal from "components/problem/ProblemPointModal";

interface ProblemBoxProps {
  problemId: number;
  nickname: string;
  writer: string;
  type: string;
  views: number;
  title: string;
  level: string;
  likes: number;
  content: string;
  hashTag: string;
  answer: string;
  solved: boolean;
}

const ProblemDetail = () => {
  const { problemId, member } = useParams(); //detail을 클릭하였을때 param에 삽입
  const [detail, setDetail] = useState<ProblemBoxProps>();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputAnswer, setInputAnswer] = useState(''); //풀이자가 답 입력 값
  const [answer, setAnswer] = useState('');//정답 저장
  const [modalTitle, setModalTitle] = useState(''); //모달 타이틀 전송
  const [pointAdd, setPointAdd] = useState(0); // 포인트
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부
  const [originalAnswer, setOriginalAnswer] = useState(""); // 수정 모드 진입 시 기존 답변 저장


  //세션에 저장되어있는 값을 가져오기
  const sessionAnswer = sessionStorage.getItem('answer') || '';

  const openModal = () => {
    if (window.confirm("답안을 제출 하시겠습니까?")) {
      setModalOpen(true);

      }
    
  };

  const checkAnswer = () => {
    return answer === sessionAnswer;
  }

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/problem/2/lango`)
        // const response = await axios.get(`http://localhost:80/problem/${problemId}/{member}`)
        console.log(response);
        setDetail(response.data.data);
        setAnswer(response.data.data.answer);
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

  if (!detail) {
    return <div>Loading...</div>;
  }
  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputAnswer(event.target.value);
    console.log(answer);
    console.log(inputAnswer);
    console.log(event.target.value.trim().toLowerCase())
    if (detail.answer.trim().toLowerCase() === event.target.value.trim().toLowerCase()) {
      console.log("정답처리");
      setModalTitle("정답입니다!");
      setPointAdd(10);
    } else {
      console.log("오답처리");
      setModalTitle("오답입니다!");
      setPointAdd(0);
    }
  };

  const handleEditing = () => {
    if (window.confirm("수정 하시겠습니까?")) {
    setIsEditing(true);
    setOriginalAnswer(inputAnswer);
    setInputAnswer(detail.answer);
    setInputAnswer(""); // 이전 값으로 복원
    }
    };

  const handleSave = () => {
    setIsEditing(false);
    
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
          답변
        </label>
        <div className="mt-1">
          <textarea
            id="answer"
            name="answer"
            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-black border-2 rounded-md"
            value={inputAnswer}
            onChange={handleAnswerChange}
            disabled={!isEditing}
          ></textarea>
        </div>   
      </div>
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
  );



  // );
};

export default ProblemDetail;
