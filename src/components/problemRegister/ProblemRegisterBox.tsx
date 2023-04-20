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
import axios, { AxiosError } from "axios";
import { axiosInstance } from "apis/axiosConfig";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LocalActivity } from "@mui/icons-material";
import { ca } from "date-fns/locale";
import { sub } from "date-fns";
import { json } from "stream/consumers";
import { error } from "console";
import S3Box from "./S3Box";

const ProblemRegisterBox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputTitle, setInputTitle] = useState(location?.state ? location?.state?.title :"");
  const [inputContent, setContent] = useState(location?.state ? location?.state?.content :"");
  const [isObjective, setIsObjective] = useState(false);
  const [isSubjective, setIsSubjective] = useState(false);
  const [point, setInputPoint] = useState("10 Point");
  const [files, setFiles] = useState<File[]>(location?.state ? location?.state?.pathname : []);
  const [selectedValue, setSelectedValue] = useState(location?.state ? location?.state?.level :"bronze");
  const [hashTag, setHashTag] = useState<string[]>(location?.state ? location?.state?.hashTag :[]);
  const [selectedCheckBoxValue, setSelectedCheckBoxValue] = useState("");
  const [isValue,setIsValue]=useState(false);
  const [s3File , setS3File] = useState<string[]>([]);


  
  const [isHashTag, setIsHashTag] = useState(false);
  const [subjectiveValue, SetSubjectiveValue] = useState("");
  const [answers, setAnswers] = useState<string[]>(location?.state ? location?.state?.answerCandidate :Array(4).fill(""));
  const [selectedDropDownValue, setSelectedDropDownValue] = useState("");
console.log(location.state)
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
      type : isSubjective ? "answer" : "choice",
      writer: "Taeho",
      title: inputTitle,
      content: inputContent,
      answer: !isSubjective ?"1" : subjectiveValue,
      views:0,
      likes:0,
      level: selectedValue,
      answerCandidate: !isSubjective ? answers:[],
      tag : hashTag.join(',')
      // subjectiveAnswer: subjectiveValue,
      // objectiveAnswer: answers
      // objectiveAnswer: isObjective ? ObjectiveAnswer : []/
    };

    try {
      const response = await axios.post('http://localhost:80/api/problem',subjectiveData,{headers: {"Content-Type" : "application/json"}}).then()
      window.alert("문제 등록이 완료되었습니다.");
      navigate(`/problem`)
    console.log(`response`, response); 
    }
    catch(error: any){
        console.log(typeof error, error.response.data.detail)
        window.alert(error.response.data.detail)
        
    };
 
    console.log(subjectiveData);
  };
  const updateSubmit = async() => {
    let updatedata = {
      problemId: location.state.problemId,
      type : isSubjective ? "answer" : "choice",
      writer: "Taeho",
      title: inputTitle,
      content: inputContent,
      answer: !isSubjective ?"1" : subjectiveValue,
      level: selectedValue,
      answerCandidate: !isSubjective ? answers:[],
      hashTag : hashTag.join(",")
    }
    
    try{
      const update = await axios.patch("http://localhost:80/api/problem",updatedata)
      if(update.status===200){
        window.alert("수정이 완료되었습니다.")
        navigate(`/problem`)
      }else{
        window.alert("수정 실패");
        navigate(`/problem`)
      }
    console.log(update);
  }
    catch(error : any){
      window.alert(error.response.data.detail)
    }
  }
  const deleteSubmit = async() => {
    try{const deleted = await axios.delete(`http://localhost:80/api/problem/${location.state.problemId}`)
    window.alert("삭제가 완료되었습니다.")
    navigate(`/problem`)
    console.log("삭제")
  }catch(error){
    window.alert("삭제 권한이 없습니다. 로그인을 다시 시도해주세요.")
  }
  }

  const s3upload = (uploadedUrl: string) => {
    setS3File([...s3File, uploadedUrl]);
    window.alert(s3File[0]);
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
      {/* {isHashTag && ( */}
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
      {/* )} */}
      

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
      <S3Box 
          s3select={s3upload}
                  />
        
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
