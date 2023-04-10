import ProblemList from "problempages/ProblemList";
import SearchBox from "components/SearchBox";
import DropBoxStack from "components/dropbox/DropBoxStack";
import DropBoxLevel from "components/dropbox/DropBoxLevel";
import DropBoxType from "components/dropbox/DropBoxType";
import DropBoxSolved from "components/dropbox/DropBoxSolved";
import DropBoxadd from "components/dropbox/DropBoxadd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "components/checkbox";

const ProblemMain = () => {
 
 
  const section = [
    { nickname: "유저1", type: "🔢객관식", views: 0, title: "제목입니다", likes: 0 },
    { nickname: "유저2", type: "🔢객관식", views: 0, title: "제목입니다2", likes: 0 },
    { nickname: "유저3", type: "🔢객관식", views: 0, title: "제목입니다3", likes: 0 },
    { nickname: "유저4", type: "🔢객관식", views: 0, title: "제목입니다4", likes: 0 },
    { nickname: "유저5", type: "✍️단답형", views: 0, title: "제목입니다5", likes: 0 },
  ];
  const [isHovered, setIsHovered] = React.useState(false);


  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/problem/register");
  };


  return (
    <>
      {/* 모바일 */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="md:hidden flex flex-col gap-3" >
          <DropBoxStack
            selectName="Stack을 선택하세요"
            options={["Python", "Javascript", "Ruby"]}
            paramName="hashTag" />
          <DropBoxLevel
            selectName="Level을 선택하세요"
            options={["Gold", "Silver", "Bronze"]}
            paramName="level" />
          <DropBoxSolved
            selectName="solved를 선택하세요"
            options={["Solved", "Solve"]}
            paramName="solved" />
          <DropBoxType
            selectName="Type을 선택하세요"
            options={["Choice", "Answer"]}
            paramName="type" />
          {/* <DropBoxadd /> */}
          <Checkbox />
        </div>
        <SearchBox />
        <ProblemList section={section} sectionHeader={"등록된 문제"} />
        <div className="flex justify-end">
          <button
            type="button"
            className="group rounded-2xl h-10 w-24 bg-blue-500 font-bold text-10 text-white relative overflow-hidden" onClick={navigateToRegister}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            문제 등록
            <div
              className={`absolute duration-200 inset-0 w-full h-full transition-all scale-0 ${isHovered ? 'scale-100 bg-white/30' : ''
                } rounded-2xl`}
            />
          </button>
        </div>
      </div>
      {/* 데스크탑 */}
      <div className="hidden md:grid grid-cols-1 gap-4 w-full">
        <div className="hidden md:grid grid-cols-5 gap-4 w-full ">
          <DropBoxStack
            selectName="Stack을 선택하세요"
            options={["Python", "Javascript", "Ruby"]}
            paramName="hashTag" />
          <DropBoxLevel
            selectName="Level을 선택하세요"
            options={["Gold", "Silver", "Bronze"]}
            paramName="level" />
          <DropBoxSolved
            selectName="solved를 선택하세요"
            options={["Solved", "Solve"]}
            paramName="solved" />
          <DropBoxType
            selectName="Type을 선택하세요"
            options={["Choice", "Answer"]}
            paramName="type" />

          {/* <DropBoxadd /> */}
          <Checkbox />

        </div>

        <SearchBox />
        <ProblemList section={section} sectionHeader={"등록된 문제"} />
        <div className="flex justify-end">
          <button
            type="button"
            className="group rounded-2xl h-10 w-24 bg-blue-500 font-bold text-10 text-white relative overflow-hidden" onClick={navigateToRegister}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            문제 등록
            <div
              className={`absolute duration-200 inset-0 w-full h-full transition-all scale-0 ${isHovered ? 'scale-100 bg-white/30' : ''
                } rounded-2xl`}
            />
          </button>
        </div>
      </div>
    </>
  );
};


export default ProblemMain;
