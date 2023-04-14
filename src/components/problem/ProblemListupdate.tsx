import axios from "axios";
import MainListTitle from "../MainListTitle";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/global.css';
import '../../styles/list.css';

interface MainListProps {
  nickname: string;
  type: string;
  views: number;
  title: string;
  likes: number;
}

type Type = {
  section: MainListProps[];
  sectionHeader: string;
};

const MainList = ({ section, sectionHeader }: Type) => {
  const handleOnClick = async () => {
    try {
      const response = await axios.get("http://localhost/api/member", {
        params: { memberId: 1 },
      });
      console.log(response.data);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const [data, setData] = useState(section.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 100) {
      loadMoreData();
    }
  };

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    setPage(prevPage => prevPage + 1);

    const newData = [
      { nickname: `유저${page * 5 + 1}`, type: "🔢객관식", views: 0, title: `제목입니다${page * 5 + 1}`, likes: 0 },
      { nickname: `유저${page * 5 + 2}`, type: "✍️단답형", views: 0, title: `제목입니다${page * 5 + 2}`, likes: 0 },
      { nickname: `유저${page * 5 + 3}`, type: "🔢객관식", views: 0, title: `제목입니다${page * 5 + 3}`, likes: 0 },
      { nickname: `유저${page * 5 + 4}`, type: "✍️단답형", views: 0, title: `제목입니다${page * 5 + 4}`, likes: 0 },
      { nickname: `유저${page * 5 + 5}`, type: "🔢객관식", views: 0, title: `제목입니다${page * 5 + 5}`, likes: 0 },
    ];

    if (newData.length === 0) {
      setHasMoreData(false);
    } else {
      setData(prevData => [...prevData, ...newData]);
    }

    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMoreData]);

  

  
  return (
    <>
    
    <div className="flex flex-col space-y-3" style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
        {data.map((el) => (

          <div
            key={el.title}
            className=" bg-gray-300 relative group hover:text-slate-300 cursor-pointer bg-gray-200 rounded-lg"
            onClick={handleOnClick}
          >
            {/* <span className="absolute -top-2 left-0 border-0.25 border-pink-600 transition-transform transform translate-y-2 ease duration-100 group-hover:translate-y-0"> */}
            <div className="relative z-10 bg-gray-200 w-full h-full transition-transform transform ease duration-100 group-hover:translate-x-2 group-hover:-translate-y-2 rounded-lg">
            {/* <span className="absolute bottom-0 -right-2 border-0.25 border-pink-600 transition-transform transform -translate-x-2 rotate-180 ease duration-100 group-hover:translate-x-0"></span> */}
            <div className="flex justify-between">
              <div className="flex">
                <div className="text-sm font-semibold ml-2 text-black">
                  {el.nickname} &nbsp;
                </div>
                <div className="text-sm font-semibold text-black">{el.type}</div>
              </div>
              <div className="flex">
                <div className="text-sm mr-4 text-black"><label className="font-bold">조회수</label>{el.views}</div>
                <div className="text-sm mr-4 text-black"><label className="font-bold">좋아요</label>{el.likes}</div>
              </div>
            </div>
            <div className="text-2xl font-bold ml-2 text-black">{el.title}</div>
            </div>
            {/* </span> */}
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}

    </>
  );
};
export default MainList;
