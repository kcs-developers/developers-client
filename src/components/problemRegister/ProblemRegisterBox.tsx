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

const ProblemRegisterBox = () => {
  const [inputTitle, setInputTitle] = useState("");
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
      title: inputTitle,
      content: inputContent,
      level: selectedValue,
      type: isSubjective ? "주관식" : "객관식",
      writer: "Taeho", // 추후 Recoild에서 받아올 예정
      solution: isSubjective ? subjectiveValue : answers,
      // subjectiveAnswer: subjectiveValue,
      // objectiveAnswer: answers
      // objectiveAnswer: isObjective ? ObjectiveAnswer : []/
    };

    console.log(subjectiveData);
  };

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
      <SubmitButton text={"제출하기"} onClick={handleSubmit} />

      <HashTagBox handleHashTagClick={handleHashTagClick} />
    </>
  );
};

export default ProblemRegisterBox;
