import { Link, useNavigate } from "react-router-dom";
import NotificationIcon from "./icons/NotificationIcon";
import PersonIcon from "./icons/PersonIcon";
import MenuBarIcon from "./icons/MenuBarIcon";
import { useState } from "react";
import MenuCloseIcon from "./icons/MenuCloseIcon";

const Nav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const sideBarMenu = [
    { title: "홈", href: "/" },
    { title: "문제 풀이", href: "/problem" },
    { title: "멘토링", href: "/mentoring" },
  ];
  const isLoggedIn = false; // 임시 로그인 상태

  const handleOpenMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <nav className="px-4 py-3 bg-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="w-auto h-6"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="로고 이미지"
          />
          <div className="ml-4 font-bold text-white">Developers</div>
        </Link>
        <div className="hidden md:block">
          <div className="flex items-center">
            <Link
              to="/problem"
              className="px-3 py-2 text-sm font-medium text-white rounded-md hover:text-gray-300 hover:bg-gray-700"
            >
              문제 풀이
            </Link>
            <Link
              to="/mentoring"
              className="px-3 py-2 ml-4 text-sm font-medium text-white rounded-md hover:text-gray-300 hover:bg-gray-700"
            >
              멘토링
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <button className="p-2 mr-1">
            <NotificationIcon fill="white" />
          </button>
          <div className="hidden md:block">
            <button
              className="p-2"
              onClick={() =>
                navigate(isLoggedIn ? "/profile/:memberId" : "/login")
              }
            >
              <PersonIcon fill="white" />
            </button>
          </div>
          {/* 모바일 화면에서 햄버거 메뉴 표시 */}
          <div className="block md:hidden">
            <div className="border-none " onClick={handleOpenMenuBar}>
              <button className={`p-2 ${isOpenMenu ? "hidden" : "block"}`}>
                <MenuBarIcon fill="white" />
              </button>
            </div>
            {/* 메뉴 활성화 시 SideBar */}
            <div
              className={`${
                isOpenMenu
                  ? "fixed left-0 top-0 w-full h-full bg-neutral-700/[0.6] z-40"
                  : ""
              }`}
            >
              <div
                className={`bg-white fixed p-5 top-0 right-0 h-full w-48 z-10  transition-all	${
                  isOpenMenu ? "translate-x-0" : "translate-x-full"
                }`}
                onBlur={() => setIsOpenMenu(false)}
              >
                <button
                  className={`absolute top-2 p-1 bg-transparent border-none -left-12 ${
                    isOpenMenu ? "block" : "hidden"
                  }`}
                  onClick={handleOpenMenuBar}
                >
                  <MenuCloseIcon fill="white" />
                </button>

                {sideBarMenu?.map((menu) => (
                  <Link
                    to={menu.href}
                    className="block pb-1 mb-2 text-xl font-light border-b border-solid border-slate-200 hover:font-normal "
                    onClick={() => setIsOpenMenu(false)}
                    key={menu.title}
                  >
                    {menu.title}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <Link
                    to="/profile/:memberId"
                    className="block pb-1 mb-2 text-xl font-light border-b border-solid border-slate-200 hover:font-normal"
                    onClick={() => setIsOpenMenu(false)}
                  >
                    마이페이지
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
