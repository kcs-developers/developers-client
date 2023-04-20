import { useState } from "react";
import SubjectiveAnswer from "./SubjectiveAnswer";

interface objectiveAnswerComponent {
  Count: number;
  onChange: (answers: string[]) => void;
  answers:string[];
  setAnswers:(answers: string[]) => void;

}

const ObjectiveAnswer = ({ Count, onChange,answers,setAnswers }: objectiveAnswerComponent) => {

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
    onChange(newAnswers);
  };
  return (
    <div className="mt-4">
      {[...Array(Count)].map((_, index) => (
        <div key={index} className="mb-2">
          <span className="mr-2">{index + 1}. </span>
          <input
            type="text"
            className="border border-gray-300 px-2 py-1"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ObjectiveAnswer;
