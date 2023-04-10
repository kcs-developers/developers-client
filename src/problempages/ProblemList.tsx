import axios from "axios";
import MainListTitle from "../components/MainListTitle";

interface MainListProps {
  nickname: string;
  type: string;
  views: number;
  title: string;
}

type Type = {
  section: MainListProps[]; 
  sectionHeader: string;
};

const MainList = ({ section, sectionHeader }: Type) => {
  // API 요청 test
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
  return (
    <>
      <div className="flex flex-col  ">
        <MainListTitle>{sectionHeader}</MainListTitle>
        {section.map((el) => (
          <div
            key={el.title}
            className="hover:text-slate-500 cursor-pointer"
            onClick={handleOnClick}
          >
            <div className="flex justify-between">
              <div className="flex">
                <div className="text-sm font-semibold">
                  {el.nickname} &nbsp;
                </div>
                <div className="text-sm font-semibold">{el.type}</div>
              </div>
              <div className="text-sm">{el.views}</div>
            </div>
            <div className="text-2xl font-bold">{el.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MainList;
