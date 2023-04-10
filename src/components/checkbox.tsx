import React, { useState, useEffect } from "react";
import axios from "axios";

const Checkbox: React.FC = () => {
    const [checkboxState, setCheckboxState] = useState({
        views: false,
        likes: false,
        createdTime: false,
    });
 
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/problem/list", {
                params: {
                    views: checkboxState.views ? 1 : null,
                    likes: checkboxState.likes ? 1 : null,
                    createdTime: checkboxState.createdTime ? "createdTime" : null,
                },
            });

            // 결과 처리
            console.log(response.data);
        };
 
        fetchData();
    }, [checkboxState]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxState((prevState) => ({ ...prevState, [name]: checked }));
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center justify-center my-2">
                <input
                    type="checkbox"
                    name="createdTime"
                    onChange={handleCheckboxChange}
                    checked={checkboxState.createdTime}
                    className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                />
                    <label className="ml-2 font-bold text-sm">최신순</label>
                </div>
                <div className="flex items-center justify-center my-2">
                <input
                    type="checkbox"
                    name="views"
                    onChange={handleCheckboxChange}
                    checked={checkboxState.views}
                    className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                />

                    <label className="ml-2 font-bold text-sm">조회순</label>
                </div>
                <div className="flex items-center justify-center my-2">
                <input
                    type="checkbox"
                    name="likes"
                    onChange={handleCheckboxChange}
                    checked={checkboxState.likes}
                    className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                />
                    <label className="ml-2 font-bold text-sm">추천순</label>
                </div>
            </div>
        </>
    );
}

export default Checkbox;
