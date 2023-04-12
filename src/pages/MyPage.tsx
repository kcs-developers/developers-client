import RightArrowIcon from "components/icons/RightArrowIcon";

const MyPage = () => {
  const careerInfo = ["이력", "멘토", "후기"];
  return (
    <div className="md:grid grid-cols-3 gap-2 h-auto">
      <div className=" bg-zinc-50 rounded-3xl mb-4 md:mr-4 shadow-lg p-4 pb-10 md:sticky md:top-20 md:h-fit">
        <div className="flex pb-4 mb-4 border-b ">
          <div className="w-[100px] h-[100px] rounded-3xl bg-slate-200"></div>
          <div className="flex flex-col justify-between px-3">
            <span>{`<칭호/> nickname`}</span>
            <div className="font-light">
              포인트
              <span className="font-bold"> {`000`}</span> 점
            </div>
          </div>
        </div>
        <div className="pb-4 mb-4 border-b">
          <div className="font-extrabold text-zinc-500 mb-2">내 정보 관리</div>
          <div className="hover:bg-zinc-200 transition-all rounded-md p-2 flex justify-between ">
            이메일 <RightArrowIcon />
          </div>
          <div className="hover:bg-zinc-200 transition-all rounded-md p-2 flex justify-between">
            닉네임 <RightArrowIcon />
          </div>
          <div className="hover:bg-zinc-200 transition-all rounded-md p-2 flex justify-between">
            거주지 <RightArrowIcon />
          </div>
        </div>
        <div className="flex justify-around">
          <button className="p-2 bg-slate-200 rounded-md text-accent-400 hover:font-bold">
            로그아웃
          </button>
          <button className="p-2 bg-red-50 rounded-md text-red-500 hover:font-bold">
            회원탈퇴
          </button>
        </div>
      </div>
      <div className="bg-zinc-50 rounded-3xl md:col-span-2 h-auto shadow-lg p-4">
        <div className="font-extrabold text-zinc-500 mb-2">
          커리어 정보 관리
        </div>
        {careerInfo?.map((el) => (
          <div className="hover:bg-zinc-200 transition-all rounded-md p-2 flex justify-between h-96">
            {el} <RightArrowIcon />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyPage;
