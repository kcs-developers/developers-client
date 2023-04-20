import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "components/axiosInstance";


interface ModalProps {
  title: string; 
  // content: string;
  // level: string; //level값을 토대로 점수 합산 
  point: number;
  isOpen: boolean;
  onClose: () => void;

}

const Modal: React.FC<ModalProps> = ({ title,point, isOpen, onClose }) => { //String뺐음
  const [visible, setVisible] = useState(isOpen);
  const navigate = useNavigate();
  
  // const bronze = {
  //   key: 'bronze',
  //   point: 6
  // }
  // const silver = {
  //   key: 'silver',
  //   point: 7 
  // }
  // const gold = {
  //   key: 'gold',
  //   point: 8
  // }
  
  const[pointAdd, setPointAdd] = useState(""); // 점수 값 저장



  
  const navigateToList = () =>{
    navigate("/problem")
  }


  const saveSolution = async () => {
    try {
      const request = {
        problemId: 68, // 실제 문제 ID로 변경하세요. -> 해당 문제의 id를 받아와야함
        solver: "yeop", // 실제 푼 사람의 사용자 이름으로 변경하세요. -> 나중에 사용자 값을 받아야함
        id: 12, // 적절한 id 값을 설정하세요.
      };
      const response = await axios.post("http://localhost:9001/api/solution", request);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    if (title === "정답입니다!") {
      saveSolution();
    }
    setVisible(false);
    onClose();
  };



  return visible ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative z-10 w-11/12 max-w-md p-6 mx-auto bg-white rounded-md shadow-lg ">
        <div className="mt-4">
          <h2 className="text-lg font-medium leading-6 text-gray-900">{title}</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-500">content+{point}</p>
          </div>
        </div>

        <div className="flex-col gap-2 mt-5 sm:mt-6">
        <div className="flex flex-row justify-between">
    <button
      type="button"
      className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm mr-2"
      onClick={navigateToList}
    >
      문제 리스트로 이동
    </button>
    <button
      type="button"
      className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm ml-2"
      onClick={handleClose}
    >
      OK
    </button>
  </div>
</div>


      </div>
    </div>
  ) : null;
};

export default Modal;

// //------------
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface ModalProps {
//   // title: string; 
//   // level: string; //level값을 토대로 점수 합산
//   // isAnswerCorrect: boolean; // isAnswerCorrect 추가
//   // memberpoint: number
//   isOpen: boolean;
//   onClose: () => void;

// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => { //title,String뺐음
//   const [visible, setVisible] = useState(isOpen);
//   const navigate = useNavigate();
//   // const [AnswerCorrect, setAnswerCorrect] = useState(isAnswerCorrect);
//   const [answerTitle, setAnswerTitle] = useState('');

//   interface Medal {
//     key: string;
//     point: number;
//   }
  
//   const bronze: Medal = {
//     key: 'bronze',
//     point: 6
//   };
  
//   const silver: Medal = {
//     key: 'silver',
//     point: 7 
//   };
  
//   const gold: Medal = {
//     key: 'gold',
//     point: 8
//   };
  
//   const [pointAdd, setPointAdd] = useState<number>(0); // 점수 값 저장
 
//   const pointVisible = (visible:boolean, Medal:number) =>{
//     if(visible === true){
//       //레벨에 따른 조건문
//       if(level === 'bronze'){
//         setPointAdd(Medal)
//       }else if(level === 'silver'){
//         setPointAdd(Medal)
//       }else if(level === 'gold'){
//         setPointAdd(Medal)
//       }
//       }

//     if(AnswerCorrect === true){
//       setAnswerTitle("정답입니다.");
//     }else{
//       setAnswerTitle("오답입니다.")
//     }
//     }

//   const handleClose = () => {
//     setVisible(false);
//     onClose();
//   };

  

  
  
//   const navigateToList = () =>{
//     navigate("/problem")
//   }

//   return visible ? (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
//       <div className="relative z-10 w-11/12 max-w-md p-6 mx-auto bg-white rounded-md shadow-lg h-3/6">
//         <div className="mt-4">
//           <h2 className="text-lg font-medium leading-6 text-gray-900">{answerTitle}</h2>
//           <div className="mt-4">
//             <p className="text-sm text-gray-500">content + {pointAdd}</p>
//           </div>
//         </div>

//         <div className="flex-col gap-2 mt-5 sm:mt-6">
//         <div className="flex flex-row justify-between">
//     <button
//       type="button"
//       className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm mr-2"
//       onClick={navigateToList}
//     >
//       문제 리스트로 이동
//     </button>
//     <button
//       type="button"
//       className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm ml-2"
//       onClick={handleClose}
//     >
//       OK
//     </button>
//   </div>
// </div>


//       </div>
//     </div>
//   ) : null;
// };

// export default Modal;
