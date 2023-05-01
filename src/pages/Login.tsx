import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberInfoState } from "recoil/userState";
import { axiosInstance } from "apis/axiosConfig";
import { MEMBER_API } from "apis/apis";
import NaverOauthBtn from "components/buttons/NaverOauthBtn";
import GoogleOauthBtn from "components/buttons/GoogleOauthBtn";
import { setLocalStorage } from "libs/localStorage";

interface LoginProps {
  loginEmail: string;
  loginPassword: string;
}

const Login = () => {
  const [member, setMember] = useRecoilState(memberInfoState);
  const navigate = useNavigate();
  const [errLogInMsg, setErrLogInMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginProps>({ mode: "onChange" });

  const handleLoginSubmit: SubmitHandler<LoginProps> = async (formData) => {
    try {
      const { data, status } = await MEMBER_API.login(formData);
      if (status === 200) {
        let accessToken = data.accessToken;
        let refreshToken = data.refreshToken;
        setLocalStorage("access_token", accessToken); // 임시
        setLocalStorage("refresh_token", refreshToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        const resData = {
          memberId: Number(data.memberId),
          isLoggedIn: true,
        };
        setMember({
          ...member,
          ...resData,
        });

        /* 유저정보 조회 */
        const userData = await MEMBER_API.getUser(data.memberId);
        setMember({
          ...member,
          isLoggedIn: true,
          memberId: Number(data.memberId),
          memberInfo: userData?.data.data,
        });
        // console.log("로그인후 유저정보조회:", userData?.data.data);
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err?.response!.data?.status === 401) {
        if (err?.response!.data?.message === "로그인에 실패했습니다.") {
          setErrLogInMsg(
            "로그인에 실패했습니다. 아이디나 비밀번호를 정확하게 입력해주세요"
          );
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-4/5">
        <div className="flex justify-center text-2xl font-light">로그인</div>
        <form
          className="flex justify-center mt-10"
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <div className="flex flex-col w-full max-w-lg">
            <label className="mt-4 text-xs">이메일</label>
            <input
              type="email"
              placeholder="example@developers.com"
              className="sign_input"
              {...register("loginEmail", {
                required: "이메일을 올바르게 입력해주세요.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "이메일을 올바르게 입력해주세요.",
                },
                onChange: () => setErrLogInMsg(""),
              })}
            />
            <div className="text-xs text-red-500">
              {errors?.loginEmail?.message}
            </div>

            <label className="mt-4 text-xs">비밀번호</label>
            <input
              type="password"
              placeholder="******"
              className="sign_input"
              {...register("loginPassword", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "6자 이상 18자 이하의 비밀번호를 입력해주세요.",
                },
                maxLength: {
                  value: 18,
                  message: "18자 이하의 비밀번호를 입력해주세요",
                },
                onChange: () => setErrLogInMsg(""),
              })}
            />
            <div className="text-xs text-red-500">
              {errors?.loginPassword?.message} {errLogInMsg && errLogInMsg}
            </div>

            <button
              type="submit"
              className="sign_form_submit_btn bg-accent-400"
            >
              로그인
            </button>
            <div className="flex justify-between font-light">
              아직 계정이 없다면?
              <Link
                to="/register"
                className="font-semibold text-accent-300 hover:text-accent-500"
              >
                회원가입
              </Link>
            </div>

            <div className="flex justify-center mt-20 mb-8 font-light">
              소셜 계정으로 로그인
            </div>
            <div className="flex justify-center">
              <NaverOauthBtn />
              <GoogleOauthBtn />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
