import React, { useState } from "react";
import TitleBox from "./TitleBox";
import ContentBox from "./ContentBox";
import LevelDropdown from "./LevelDropdown";
import Checkbox from "./TypeBox";
import ObjectiveAnswer from "./ObjectiveAnswer";
import SubjectiveAnswer from "./SubjectiveAnswer";
import ProblemRegister from "pages/ProblemRegister";
import Submit from "./SubmitButton";
import SubmitButton from "./SubmitButton";
import PointBox from "./PointBox";
import FileUpload from "./FileUpload";
import HashTagBox from "./HashTagBox";
import axios from "axios";
import { axiosInstance } from "apis/axiosConfig";
import { useLocation } from "react-router-dom";
import { LocalActivity } from "@mui/icons-material";
import { ca } from "date-fns/locale";

const ProblemRegisterBox = () => {
  const location = useLocation();

  const [inputTitle, setInputTitle] = useState(location?.state ? location?.state?.title :"");
  const [inputContent, setContent] = useState("");
  const [isObjective, setIsObjective] = useState(false);
  const [isSubjective, setIsSubjective] = useState(false);
  const [point, setInputPoint] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [selectedCheckBoxValue, setSelectedCheckBoxValue] = useState("");

  const [isHashTag, setIsHashTag] = useState(false);
  const [subjectiveValue, SetSubjectiveValue] = useState("");
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const [selectedDropDownValue, setSelectedDropDownValue] = useState("");


  console.log("location",location);

  const handleHashTagClick = (index: Number, item: string) => {
    if (hashTag.includes(item)) {
      return alert("이미 해쉬태그가 등록이되어있습니다.");
    } else {
      setHashTag([...hashTag, item]);
      setIsHashTag(true);
    }
  };
  const handleDeleteHashTagClick = (i: Number, item: string) => {
    setHashTag(hashTag.filter((data, index) => data !== item));

    // 10보다 큰 요소의 위치를 찾은 경우 해당 요소를 제거합니다.
    console.log(hashTag);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };
  const handlePointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPoint(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleDropDownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckboxChange = (value: boolean) => {
    setIsObjective(!value);
  };

  const handleSubmit = async () => {
    let subjectiveData = {
      "type": "choice",
      "writer": "Taeho",
      "title": "ㅂㅈㄷㄱ",
      "content": "Spring Boot의 장/단점 중 잘못된 것은 무엇인지 4가지 중에 골라주세요.",
      "answer": "1",
      "level": "bronze",
      "tag": null,
      "views": 259,
      "likes": 63,
      "answerCandidate" :["1"],
      "hashTag": "CS,FrontEnd,BackEnd,Cloud"

      // subjectiveAnswer: subjectiveValue,
      // objectiveAnswer: answers
      // objectiveAnswer: isObjective ? ObjectiveAnswer : []/
    };
    try {
      const response = await axios.post('http://localhost:9001/api/problem',subjectiveData)
    console.log(response); 

    }
    catch(error){
      // if (axios.isAxiosError(error)) {  
      //   console.error("Axios error:", error.message, "Code:", error.code);
      // } else {
      //   console.error("Unknown error:", error);
      // }
      console.log(error);
    };

    console.log(subjectiveData);
  };
  const updateSubmit = async() => {
    let updatedata = {
      problemId : location.state.problemId,
      writer : location.state.writer,
      title: inputTitle,
      content: inputContent,
      answerCandidate: !isSubjective ? answers : [],
      level : selectedValue,
      tag : hashTag
    }
    console.log(updatedata)
    try{const update = await axios.patch("http://localhost:9001/api/problem",updatedata)
    window.alert("수정이 완료되었습니다.")
    console.log("수정")}
    catch(error){
      window.alert("수정 권한이 없습니다. 로그인을 다시 시도해주세요")
    }
  }
  const deleteSubmit = () => {
    console.log("삭제")
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex flex -row ">
          <LevelDropdown
            options={selectedValue}
            handleDropDownChange={handleDropDownChange}
          />
          <Checkbox
            isSubjective={isSubjective}
            setIsSubjective={setIsSubjective}
            onChange={handleCheckboxChange}
          />
        </div>
        <PointBox point={point} handlePointChange={handlePointChange} />
      </div>

      <div className=" bg-gray-200 px-20 py-10 rounded">    
      <TitleBox title={inputTitle} handleTitleChange={handleTitleChange} />
      {isHashTag && (
        <div className="flex ">
          {hashTag.map((item, index) => (
            <div>
              <div className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                {item}
                <button
                  onClick={() => {
                    handleDeleteHashTagClick(index + 1, item);
                  }}
                  className="ml-5"
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      

      <div></div>
      <ContentBox
        content={inputContent}
        handleContentChange={handleContentChange}
      />
  </div>
      {console.log(isSubjective)}
      {isSubjective ? (
        <SubjectiveAnswer
          children={subjectiveValue}
          onChange={(e) => {
            SetSubjectiveValue(e.target.value);
          }}
        />
      ) : (
        <ObjectiveAnswer
          answers={answers}
          setAnswers={setAnswers}
          Count={4}
          onChange={() => {}}
        />
      )}
      <div>
        <FileUpload files={files} onFileChange={handleFileChange} />
      </div>
      {
 
  !location.state && <SubmitButton text={"제출하기"} onClick={handleSubmit} /> 
}

<div className="gap-2 flex">
{location.state && <SubmitButton text={"수정"} onClick={updateSubmit} />}
  {location.state && <SubmitButton text={"삭제"} onClick={deleteSubmit} />}
</div>
      <HashTagBox handleHashTagClick={handleHashTagClick} />
    </>
  );
};

export default ProblemRegisterBox;
