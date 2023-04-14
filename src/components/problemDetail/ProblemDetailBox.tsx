import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Titlebox from "./TitleBox";
import SolutionBox from "./SolutionBox";
import ContentBox from "./ContentBox";

interface ProblemBoxProps{
    nickname: string;
    type: string;
    views: number;
    title: string;
    level: string;
    likes: number;
    content: string;
    answer: string;
}
const ProblemBox = () =>{
    const [data, setdata]= useState<ProblemBoxProps>();
    const location = useLocation();
    const locationtest = location?.state;
     const fetchData = async()=>{
            try{
                const response = await axios.get(`http://localhost:80/problem/48/woo`)
                // `http://localhost:80/problem/${locationtest?.id}/{locationtest?.writer}
            console.log(response);
            setdata(response.data.data);
            }
            catch(error){
                console.error(error);
            }
        };

        useEffect(()=>{
            fetchData();
        },[])

        console.log(data?.title)
        return (
            <>
            <Titlebox>{data?.title}</Titlebox>
            <SolutionBox>{data?.answer}</SolutionBox>
          <ContentBox>{data?.content}</ContentBox>
            {/* {data?.map((problem,index)=>{

                console.log(problem);
            })} */}
            {/* {data.map((problem, index) => ( s
        <div key={index}>
          <Titlebox>{problem?.title}</Titlebox>
          <SolutionBox>{problem?.answer}</SolutionBox>
          <ContentBox>{problem?.content}</ContentBox>
        </div>
      ))} */}
            </>
        )
}
export default ProblemBox;