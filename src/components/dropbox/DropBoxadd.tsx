//수정하지 않길 바람
import { Fragment, useState } from "react"

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectDropValue, setSelectDropValue] = useState('항목을 선택하세요')
    const toggleSelect = () => {
         setIsOpen(!isOpen);
    } 
 
    const menuSelect = (value: string | null) => {
        if (value) {
            setSelectDropValue(value);
            setIsOpen(false);
        }
    };

    const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        if (value) {
            menuSelect(value);
        }
    };
    const handleClear = () => {
        setSelectDropValue("항목을 선택하세요");
    };


    return (
        <div>
            <style>{`
    .top-100 {top: 100%}
    .bottom-100 {bottom: 100%}
    .max-h-select {
        max-height: 300px;
    }
`}</style>
            <Fragment>
                <div className="flex-auto flex flex-col items-center h-14">
                    <div className="flex flex-col items-center relative">
                        <div className="w-full  svelte-1l8159u">
                            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u">
                                <div className="flex flex-auto flex-wrap"></div>
                                <input
                                    value={selectDropValue}
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800 svelte-1l8159u font-bold"
                                    style={{ color: selectDropValue === "항목을 선택하세요" ? "gray" : "black", fontSize: selectDropValue === "항목을 선택하세요" ? "9pt" : "inherit" }}
                                />                                <div>
                                    <button
                                        className="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none"
                                        onClick={handleClear}
                                    >                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x w-4 h-4">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u" onClick={toggleSelect}>
                                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-up w-4 h-4">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                            <div className="flex flex-col w-full">
                                {isOpen && (<div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100" style={{ borderBottom: '1px solid #ccc' }} data-value="Python" onClick={handleMenuClick}>
                                    <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                                        <div className="w-full items-center flex">
                                            <div className="mx-2 leading-6">Python</div>
                                        </div>
                                    </div>
                                </div>)}
                                {isOpen && (
                                    <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100" style={{ borderBottom: '1px solid #ccc' }} data-value="Javascript" onClick={handleMenuClick}>
                                        <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 border-teal-600">
                                            <div className="w-full items-center flex">
                                                <div className="mx-2 leading-6">Javascript</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {isOpen && (
                                    <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100" style={{ borderBottom: '1px solid #ccc' }} data-value="Ruby" onClick={handleMenuClick}>
                                        <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                                            <div className="w-full items-center flex">
                                                <div className="mx-2 leading-6">Ruby</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    )
}
export default Search;


