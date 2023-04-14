import ProblemListupdate from "components/problem/ProblemListupdate";
import SearchBox from "components/SearchBox";
import DropBoxStack from "components/dropbox/DropBoxCondition";
import DropBoxLevel from "components/dropbox/DropBoxLevel";
import DropBoxType from "components/dropbox/DropBoxType";
import DropBoxSolved from "components/dropbox/DropBoxSolved";

import React from "react";
import { useNavigate } from "react-router-dom";
import HashTagComponent from "../components/problem/HashTagComponent";

const ProblemMain = () => {
  const section = [
    {
      nickname: "유저1",
      type: "🔢객관식",
      views: 0,
      title: "제목입니다",
      likes: 0,
    },
    {
      nickname: "유저2",
      type: "🔢객관식",
      views: 0,
      title: "제목입니다2",
      likes: 0,
    },
    {
      nickname: "유저3",
      type: "🔢객관식",
      views: 0,
      title: "제목입니다3",
      likes: 0,
    },
    {
      nickname: "유저4",
      type: "🔢객관식",
      views: 0,
      title: "제목입니다4",
      likes: 0,
    },
    {
      nickname: "유저5",
      type: "✍️단답형",
      views: 0,
      title: "제목입니다5",
      likes: 0,
    },
    {
      nickname: "유저6",
      type: "✍️단답형",
      views: 0,
      title: "제목입니다5",
      likes: 0,
    },
    {
      nickname: "유저7",
      type: "✍️단답형",
      views: 0,
      title: "제목입니다5",
      likes: 0,
    },
    {
      nickname: "유저8",
      type: "✍️단답형",
      views: 0,
      title: "제목입니다5",
      likes: 0,
    },
  ].slice(0, 5);
  const [isHovered, setIsHovered] = React.useState(false);

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/problem/register");
  };

  const navigatorToDetail = () =>{
    navigate("/problem/detail/sb")
  }

  return (
    <>
      {/* 모바일 */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="md:hidden flex flex-col gap-3">
          <DropBoxLevel
            selectName="Level을 선택하세요"
            options={["Gold", "Silver", "Bronze"]}
            paramName="level"
          />
          <DropBoxSolved
            selectName="solved를 선택하세요"
            options={["Solved", "Solve"]}
            paramName="solved"
          />
          <DropBoxType
            selectName="Type을 선택하세요"
            options={["Choice", "Answer"]}
            paramName="type"
          />
        </div>

        <div className=" flex-col md:grid grid-cols-1 gap-1 w-full">
          <SearchBox />
          <HashTagComponent />
          <DropBoxStack
            selectName="조건을 선택하세요"
            options={["최신순", "추천순", "조회순"]}
            paramName=""
          />
        </div>
        <h2
          className="bg-gray-400 relative group-slate-300 rounded-lg font-bold text-xl text-white text-center"
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Problem
        </h2>
        <ProblemListupdate section={section} sectionHeader={""} />
        <div className="flex justify-end">
          <button
            type="button"
            className="group rounded-2xl h-10 w-24 bg-blue-500 font-bold text-10 text-white relative overflow-hidden"
            onClick={navigateToRegister}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            문제 등록
            <div
              className={`absolute duration-200 inset-0 w-full h-full transition-all scale-0 ${
                isHovered ? "scale-100 bg-white/30" : ""
              } rounded-2xl`}
            />
          </button>
        </div>
      </div>
      {/* 데스크탑 */}
      <div className="hidden md:grid grid-cols-1 gap-4 w-full">
        <div className="hidden md:grid grid-cols-4 gap-4 w-full  ">
          <DropBoxLevel
            selectName="Level을 선택하세요"
            options={["Gold", "Silver", "Bronze"]}
            paramName="level"
          />
          <DropBoxSolved
            selectName="solved를 선택하세요"
            options={["Solved", "Solve"]}
            paramName="solved"
          />
          <DropBoxType
            selectName="Type을 선택하세요"
            options={["Choice", "Answer"]}
            paramName="type"
          />
        </div>
        <div className="hidden flex-col md:grid grid-cols-1 gap-1 w-full">
          <SearchBox />

          <HashTagComponent />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <DropBoxStack
              selectName="조건을 선택하세요"
              options={["최신순", "추천순", "조회순"]}
              paramName=""
            />
          </div>
        </div>
        <h2
          className="bg-gray-400 relative group-slate-300 rounded-lg font-bold text-xl text-white text-center"
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Problem
        </h2>

        <ProblemListupdate section={section} sectionHeader={""} />
        <div className="flex justify-end">
          <button
            type="button"
            className="group rounded-2xl h-10 w-24 bg-blue-500 font-bold text-10 text-white relative overflow-hidden"
            onClick={navigateToRegister}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            문제 등록
            <div
              className={`absolute duration-200 inset-0 w-full h-full transition-all scale-0 ${
                isHovered ? "scale-100 bg-white/30" : ""
              } rounded-2xl`}
            />
          </button>
          {/* test */}
          <button
            type="button"
            className="group rounded-2xl h-10 w-24 bg-blue-500 font-bold text-10 text-white relative overflow-hidden"
            onClick={navigatorToDetail}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            문제 상세페이지 이동
            <div
              className={`absolute duration-200 inset-0 w-full h-full transition-all scale-0 ${
                isHovered ? "scale-100 bg-white/30" : ""
              } rounded-2xl`}
            />
          </button>
                    {/* test */}


          
        </div>
      </div>
    </>
  );
};

export default ProblemMain;
