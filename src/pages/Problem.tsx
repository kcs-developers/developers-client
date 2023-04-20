// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'components/axiosInstance';
// import useIntersect from "hooks/useIntersect";
// import SearchBox from "components/SearchBox";
// import DropBoxCondition from "components/dropbox/DropBoxCondition";
// import DropBoxLevel from "components/dropbox/DropBoxLevel";
// import DropBoxType from "components/dropbox/DropBoxType";
// import DropBoxSolved from "components/dropbox/DropBoxSolved";
// import HashTagComponent from "../components/problem/HashTagComponent";
// import ConfirmBtn from "components/buttons/CofirmBtn";
// import ViewIcon from "components/icons/ViewIcon";
// import LikesIcon from "components/icons/LikesIcon";
// import { testData } from "libs/options";
// import LevelIcon from "components/icons/LevelIcon";
// import Tags from "components/Tags";
// import CheckIcon from "components/icons/CheckIcon";
// import { useRecoilValue } from "recoil";
// import { memberInfoState } from "recoil/userState";
// import { useAsync } from 'react-use';
// import ScrollButton from "components/ScrollButton"

// interface ProblemProps {
//   problemId: number;
//   type: string;
//   writer: string;
//   title: string;
//   content: string;
//   answer: string;
//   level: string;
//   views: number;
//   likes: number;
//   createdTime: string;
//   hashTag: string;
//   tag?: null | string;
// }

// const Problem = () => {
//   const URL = process.env.REACT_APP_DEV_URL;



//   const navigate = useNavigate();
//   const { memberInfo } = useRecoilValue(memberInfoState); // nickname 받기
//   // const nickname = "alibaba"; // 테스트: 임시로 nickname 설정해둠
//   const nickname = memberInfo.nickname;
//   const [resData, setResData] = useState<ProblemProps[]>([]);
//   const [problemList, setProblemList] = useState<ProblemProps[]>([]);
//   const [page, setPage] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectTemp, setSelectTemp] = useState<string[]>([]);
//   const [searchTemp, setSearchTerm] = useState<string[]>([]);
//   const SIZE = 5;



//   const target = useIntersect(async (entry, observer) => {
//     observer.unobserve(entry.target);
//     if (!isLoading) {
//       loadedData();
//     }
//   });

  
  

//   const list = useAsync(async () => {
//     const params = selectTemp.join("&");
//     const response = await axios.get(`api/problem/list?${params}`);
//     console.log(params)
//     console.log(response.data)
//     return response.data; // 수정: data 프로퍼티에 접근
//   }, [selectTemp]);


//   useEffect(() => {
//     console.log(selectTemp);
//   }, [selectTemp])
  
//   useEffect(() => {
//     if (list.value) {
//       setPage(0); // 페이지 번호를 0으로 설정
//       setProblemList(list.value.data); // 문제 목록을 list.value.data로 설정
//     }
//   }, [list.value]);
  



//   // const handleChangeTemp = (value: string) => {
//   //   const prefix = value.split("=")[0];
//   //   const existingIndex = selectTemp.findIndex((e) => e.startsWith(prefix));
  
//   //   if (existingIndex !== -1) {
//   //     const newSelectTemp = [...selectTemp];
//   //     newSelectTemp[existingIndex] = value;
//   //     setSelectTemp(newSelectTemp);
//   //   } else {
//   //     setSelectTemp([...selectTemp, value]);
//   //   }
//   // };

//   const handleChangeTemp = (value: string) => {
//     const prefix = value.split("=")[0];
//     const existingIndex = selectTemp.findIndex((e) => e.startsWith(prefix));
  
//     // Remove elements with 'likes', 'views', or 'order' prefixes, except the current prefix
//     const newSelectTemp = selectTemp.filter((e) => {
//       const otherPrefix = e.split("=")[0];
//       return (otherPrefix !== 'likes' && otherPrefix !== 'views' && otherPrefix !== 'order') || otherPrefix === prefix;
//     });
  
//     // Update or add the new value
//     if (existingIndex !== -1) {
//       newSelectTemp[existingIndex] = value;
//     } else {
//       newSelectTemp.push(value);
//     }
  
//     setSelectTemp(newSelectTemp);
//   };
  
//   const handleResetTemp = (type: string) => {
//     setSelectTemp(selectTemp.filter(e => !e.startsWith(type))); 
//   };



 
 
//   const resetListData = () => {
//     setSelectTemp([]);
//     navigate("/problem"); // 이동 경로를 '/problem'으로 설정
//     window.location.reload(); // 페이지 새로고침


//     // 이러한 방법도 있음
// //     handleResetTemp("type");
// //   handleResetTemp("solved");
// //   handleResetTemp("level");
// //   handleResetTemp("hashtag");
// //   handleResetTemp("order");
// //   // DropBoxLevel.tsx
// // const DropBoxLevel = ({ selectFn, handleResetTemp }) => {
// //   const [selectedLevel, setSelectedLevel] = useState(""); // 상태 초기화를 위해 빈 문자열로 초기값 설정

// //   // ... 생략 ...

// //   useEffect(() => {
// //     if (handleResetTemp) {
// //       handleResetTemp(selectedLevel); // 초기화 함수에 현재 선택된 값을 전달
// //     }
// //   }, [handleResetTemp]);
// //   // ... 생략 ...
// // };

//   };

//   const searchList = useAsync(async () =>{
//     const params = searchTemp;
//     const response = await axios.get(`api/problem?search=${params}`);
    
//     return response



//   },[searchTemp]);

//   useEffect(() => {
//     console.log(searchTemp)
//   },[searchTemp])


//   const searchSubmit = async (value: string) => {
//     setSearchTerm([value]); // 검색어 상태 업데이트
//   };
  
//   useEffect(() => {
//     if (searchList.value) {
//       setPage(0); // 페이지 번호를 0으로 설정
//       setProblemList(searchList.value.data); // 문제 목록을 searchList.value.data로 설정
//     }
//   }, [searchList.value]);

//   useEffect(() => {
//     const getProblemList = async () => {
//       setResData([...testData]); // 임시 더미데이터
//       /* await axios
//       .get(`${URL}/api/problem/list/{sortcondition}`)
//       .then(({ data }) => {
//         console.log(data);
//         setResData(data); // 초기 100개 받기
//       })
//       .catch((err) => console.log(err)); */
//     };
//     getProblemList();
//   }, []);

//     const loadedData = async () => {
//     setIsLoading(true);
//     const totalCount = problemList.length;
//     const totalPages = Math.round(totalCount / SIZE);
//     if (totalPages >= page) {
//       setPage(page + 1);
//       const nextList = problemList.slice(page * SIZE, (page + 1) * SIZE);
//       setProblemList([...problemList, ...nextList]);
//     }
//     setIsLoading(false);
//   };

//   const handleItemClick = (problemId: number, writer: string, type: string) => { //type:추가함
//     if(type === "answer"){
//       if (writer === nickname) {

//         navigate(`/problem/edit/${problemId}`);
//       }else{
//         navigate(`/problem/detail/sb`);
//         //문제 주관식 페이지로 이동
//       }
//     }else if(type === "choice"){
//       if (writer === nickname) {
//         navigate(`/problem/edit/${problemId}`);
//       }else{
//         navigate(`/problem/detail/ob`);
//         //문제 객관식 페이지로 이동
//       }
        
        
//     }
//     console.log(type)
//     // if (writer === nickname) {
//     //   // 수정 페이지로 이동
//     //   navigate(`/problem/edit/${problemId}`);
//     // } else {
//     //   // 문제 풀이 페이지로 이동
//     //   // navigate(`/problem/${problemId}/${nickname}`);
//       // navigate(`/problem/detail/ob`);
      
//     // }
//   };
  
 
//   return (
//     <div className="md:m-auto w-full md:w-4/5">
//       <div className="flex justify-end mt-5 mb-10">
//         <ConfirmBtn type="submit" onClick={() => navigate("/problem/register")}>
//           문제 등록
//         </ConfirmBtn>
        
//         <ConfirmBtn onClick={resetListData}>데이터 초기화</ConfirmBtn> {/* 버튼 수정 */}
        

//       </div>
//       <div className="flex justify-center mb-10">
//         <div className="flex flex-col w-full">
//           <SearchBox 
//             searchFn={searchSubmit}

//           />
//           <div className="flex w-full justify-between">
//             <DropBoxLevel
//               selectFn={handleChangeTemp}
//               handleResetTemp={handleResetTemp}
//             />
//             <DropBoxSolved
//               selectFn={handleChangeTemp}
//               handleResetTemp={handleResetTemp}
//             />
//             <DropBoxType
//               selectFn={handleChangeTemp}
//               handleResetTemp={handleResetTemp}
//             />
//           </div>
//           <HashTagComponent
//             selectFn={handleChangeTemp}
//             handleResetTemp={handleResetTemp}
//           />
//         </div>
//       </div>
//       <div className="flex justify-between items-center my-4">
//         <h2 className="text-accent-500 font-bold text-xl">
//           총 {problemList.length} 문제
//         </h2>
//         <DropBoxCondition
//           selectFn={handleChangeTemp}
//           handleResetTemp={handleResetTemp}
//         />

//         {/* <div className="w-[90px]">
//           <Options label="조건" lists={conditionList} setState={setCondition} />
//         </div> */}
//       </div>
//       <div className="grid grid-cols-10 text-slate-400 font-bold text-sm border-b pb-3 my-2">
//         <div className="flex justify-center">상태</div>
//         <div className="col-span-7 flex justify-center">제목</div>
//         <div className="flex justify-center">난이도</div>
//         <div className="flex justify-center">문제 유형</div>
//       </div>

//       {problemList?.map((el, idx) => (
//       <div
//         key={idx}
//         className="grid grid-cols-10 bg-gray-100 rounded-lg py-2.5 mb-2 shadow cursor-pointer"
//         onClick={() => handleItemClick(el.problemId, el.writer, el.type)} // 타입 추가됨 
//       >
//         <div className="flex justify-center items-center">
//           {el.answer.length >= 1 ? (
//             <CheckIcon fill="blue" width={25} height={25} />
//           ) : null}
//         </div>
//         <div className="col-span-7 text-xl ">
//           <h1 className="font-semibold">{el.title}</h1>

//           <div className="flex items-center justify-between">
//             <div className="flex">
//               <div className="flex text-sm text-slate-600">{el.writer} &nbsp;</div>
//               <div className="flex text-sm mr-4 items-center text-gray-400">
//                 <ViewIcon fill="lightGray" width={18} height={18} />
//                 &nbsp;{el.views}
//               </div>
//               <div className="flex text-sm mr-4 items-center text-gray-400">
//                 <LikesIcon fill="lightGray" width={14} height={14} />
//                 &nbsp;{el.likes}
//               </div>
//             </div>
//             <Tags tagList={el.hashTag ? el.hashTag.split(",") : []} />
//             </div>
//         </div>
//         <div className="flex justify-center items-center">
//           {el.level === "gold" ? (
//             <LevelIcon fill="#D9B600" width={22} height={22} />
//           ) : el.level === "silver" ? (
//             <LevelIcon fill="gray" width={22} height={22} />
//           ) : (
//             <LevelIcon fill="#AD5600" width={22} height={22} />
//           )}
//         </div>
//         <div className="flex justify-center items-center text-sm">
//           {el.type === "answer" ? "주관식" : "객관식"}
//         </div>
//       </div>
//     ))}
//     <div ref={target}>{isLoading && <div>Loading...</div>}</div>
//     <ScrollButton/>
//   </div>
// );
// };

// export default Problem;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'components/axiosInstance';
import useIntersect from "hooks/useIntersect";
import SearchBox from "components/SearchBox";
import DropBoxCondition from "components/dropbox/DropBoxCondition";
import DropBoxLevel from "components/dropbox/DropBoxLevel";
import DropBoxType from "components/dropbox/DropBoxType";
import DropBoxSolved from "components/dropbox/DropBoxSolved";
import HashTagComponent from "../components/problem/HashTagComponent";
import ConfirmBtn from "components/buttons/CofirmBtn";
import ViewIcon from "components/icons/ViewIcon";
import LikesIcon from "components/icons/LikesIcon";
import { testData } from "libs/options";
import LevelIcon from "components/icons/LevelIcon";
import Tags from "components/Tags";
import CheckIcon from "components/icons/CheckIcon";
import { useRecoilValue } from "recoil";
import { memberInfoState } from "recoil/userState";
import { useAsync } from 'react-use';
import ScrollButton from "components/ScrollButton"

interface ProblemProps {
  problemId: number;
  type: string;
  writer: string;
  title: string;
  content: string;
  answer: string;
  level: string;
  views: number;
  likes: number;
  createdTime: string;
  hashTag: string;
  tag?: null | string;
}

const Problem = () => {
  const URL = process.env.REACT_APP_DEV_URL;



  const navigate = useNavigate();
  const { memberInfo } = useRecoilValue(memberInfoState); // nickname 받기
  // const nickname = "alibaba"; // 테스트: 임시로 nickname 설정해둠
  const nickname = memberInfo.nickname;
  const [resData, setResData] = useState<ProblemProps[]>([]);
  const [problemList, setProblemList] = useState<ProblemProps[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectTemp, setSelectTemp] = useState<string[]>([]);
  const [searchTemp, setSearchTerm] = useState<string[]>([]);
  const SIZE = 5;



  const target = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isLoading) {
      loadedData();
    }
  });

  
  

  const list = useAsync(async () => {
    const params = selectTemp.join("&");
    const response = await axios.get(`api/problem/list?${params}`);
    console.log(params)
    console.log(response.data)
    return response.data; // 수정: data 프로퍼티에 접근
  }, [selectTemp]);


  useEffect(() => {
    console.log(selectTemp);
  }, [selectTemp])
  
  useEffect(() => {
    if (list.value) {
      setPage(0); // 페이지 번호를 0으로 설정
      setProblemList(list.value.data); // 문제 목록을 list.value.data로 설정
    }
  }, [list.value]);
  



  // const handleChangeTemp = (value: string) => {
  //   const prefix = value.split("=")[0];
  //   const existingIndex = selectTemp.findIndex((e) => e.startsWith(prefix));
  
  //   if (existingIndex !== -1) {
  //     const newSelectTemp = [...selectTemp];
  //     newSelectTemp[existingIndex] = value;
  //     setSelectTemp(newSelectTemp);
  //   } else {
  //     setSelectTemp([...selectTemp, value]);
  //   }
  // };

  const handleChangeTemp = (value: string) => {
    const prefix = value.split("=")[0];
    const existingIndex = selectTemp.findIndex((e) => e.startsWith(prefix));
  
    // Remove elements with 'likes', 'views', or 'order' prefixes, except the current prefix
    const newSelectTemp = selectTemp.filter((e) => {
      const otherPrefix = e.split("=")[0];
      return (otherPrefix !== 'likes' && otherPrefix !== 'views' && otherPrefix !== 'order') || otherPrefix === prefix;
    });
  
    // Update or add the new value
    if (existingIndex !== -1) {
      newSelectTemp[existingIndex] = value;
    } else {
      newSelectTemp.push(value);
    }
  
    setSelectTemp(newSelectTemp);
  };
  
  const handleResetTemp = (type: string) => {
    setSelectTemp(selectTemp.filter(e => !e.startsWith(type))); 
  };



 
 
  const resetListData = () => {
    setSelectTemp([]);
    navigate("/problem"); // 이동 경로를 '/problem'으로 설정
    window.location.reload(); // 페이지 새로고침


    // 이러한 방법도 있음
//     handleResetTemp("type");
//   handleResetTemp("solved");
//   handleResetTemp("level");
//   handleResetTemp("hashtag");
//   handleResetTemp("order");
//   // DropBoxLevel.tsx
// const DropBoxLevel = ({ selectFn, handleResetTemp }) => {
//   const [selectedLevel, setSelectedLevel] = useState(""); // 상태 초기화를 위해 빈 문자열로 초기값 설정

//   // ... 생략 ...

//   useEffect(() => {
//     if (handleResetTemp) {
//       handleResetTemp(selectedLevel); // 초기화 함수에 현재 선택된 값을 전달
//     }
//   }, [handleResetTemp]);
//   // ... 생략 ...
// };

  };

  const searchList = useAsync(async () =>{
    const params = searchTemp;
    const response = await axios.get(`api/problem?search=${params}`);
    
    return response



  },[searchTemp]);

  useEffect(() => {
    console.log(searchTemp)
  },[searchTemp])


  const searchSubmit = async (value: string) => {
    setSearchTerm([value]); // 검색어 상태 업데이트
  };
  
  useEffect(() => {
    if (searchList.value) {
      setPage(0); // 페이지 번호를 0으로 설정
      setProblemList(searchList.value.data); // 문제 목록을 searchList.value.data로 설정
    }
  }, [searchList.value]);

  useEffect(() => {
    const getProblemList = async () => {
      setResData([...testData]); // 임시 더미데이터
      /* await axios
      .get(`${URL}/api/problem/list/{sortcondition}`)
      .then(({ data }) => {
        console.log(data);
        setResData(data); // 초기 100개 받기
      })
      .catch((err) => console.log(err)); */
    };
    getProblemList();
  }, []);

    const loadedData = async () => {
    setIsLoading(true);
    const totalCount = problemList.length;
    const totalPages = Math.round(totalCount / SIZE);
    if (totalPages >= page) {
      setPage(page + 1);
      const nextList = problemList.slice(page * SIZE, (page + 1) * SIZE);
      setProblemList([...problemList, ...nextList]);
    }
    setIsLoading(false);
  };
  
 
  return (
    <div className="md:m-auto w-full md:w-4/5">
      <div className="flex justify-end mt-5 mb-10">
        <ConfirmBtn type="submit" onClick={() => navigate("/problem/register")}>
          문제 등록
        </ConfirmBtn>
        
        <ConfirmBtn onClick={resetListData}>데이터 초기화</ConfirmBtn> {/* 버튼 수정 */}
        

      </div>
      <div className="flex justify-center mb-10">
        <div className="flex flex-col w-full">
          <SearchBox 
            searchFn={searchSubmit}

          />
          <div className="flex w-full justify-between">
            <DropBoxLevel
              selectFn={handleChangeTemp}
              handleResetTemp={handleResetTemp}
            />
            <DropBoxSolved
              selectFn={handleChangeTemp}
              handleResetTemp={handleResetTemp}
            />
            <DropBoxType
              selectFn={handleChangeTemp}
              handleResetTemp={handleResetTemp}
            />
          </div>
          <HashTagComponent
            selectFn={handleChangeTemp}
            handleResetTemp={handleResetTemp}
          />
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-accent-500 font-bold text-xl">
          총 {problemList.length} 문제
        </h2>
        <DropBoxCondition
          selectFn={handleChangeTemp}
          handleResetTemp={handleResetTemp}
        />

        {/* <div className="w-[90px]">
          <Options label="조건" lists={conditionList} setState={setCondition} />
        </div> */}
      </div>
      <div className="grid grid-cols-10 text-slate-400 font-bold text-sm border-b pb-3 my-2">
        <div className="flex justify-center">상태</div>
        <div className="col-span-7 flex justify-center">제목</div>
        <div className="flex justify-center">난이도</div>
        <div className="flex justify-center">문제 유형</div>
      </div>

      {problemList?.map((el, idx) => (
        // <Link to={`/problem/${el.problemId}/${nickname}`} key={idx}>
          <div onClick={()=>{
            // navigate(el.writer!=="Taeho"? "/problem/detail":"/problem/register",{state:el});
            navigate(el.writer!=="Taho"? "/problem/detail":"/problem/register",{state:el});
            console.log(el);
          }} className="grid grid-cols-10 bg-gray-100 rounded-lg py-2.5 mb-2 shadow">
        <div className="flex justify-center items-center">
          {el.answer.length >= 1 ? (
            <CheckIcon fill="blue" width={25} height={25} />
          ) : null}
        </div>
        <div className="col-span-7 text-xl ">
          <h1 className="font-semibold">{el.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="flex text-sm text-slate-600">{el.writer} &nbsp;</div>
              <div className="flex text-sm mr-4 items-center text-gray-400">
                <ViewIcon fill="lightGray" width={18} height={18} />
                &nbsp;{el.views}
              </div>
              <div className="flex text-sm mr-4 items-center text-gray-400">
                <LikesIcon fill="lightGray" width={14} height={14} />
                &nbsp;{el.likes}
              </div>
            </div>
            <Tags tagList={el.hashTag ? el.hashTag.split(",") : []} />
            </div>
        </div>
        <div className="flex justify-center items-center">
          {el.level === "gold" ? (
            <LevelIcon fill="#D9B600" width={22} height={22} />
          ) : el.level === "silver" ? (
            <LevelIcon fill="gray" width={22} height={22} />
          ) : (
            <LevelIcon fill="#AD5600" width={22} height={22} />
          )}
        </div>
        <div className="flex justify-center items-center text-sm">
          {el.type === "answer" ? "주관식" : "객관식"}
        </div>
      </div>
    ))}
    <div ref={target}>{isLoading && <div>Loading...</div>}</div>
    <ScrollButton/>
  </div>
);
};

export default Problem;