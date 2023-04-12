import axios from "axios";
import Options from "components/Options";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TagInput from "components/TagInput";
import MultiOptions from "components/MultiOptions";
import NaverOauthBtn from "components/buttons/NaverOauthBtn";
import GoogleOauthBtn from "components/buttons/GoogleOauthBtn";

interface SignProps {
  email: string;
  password: string;
  pwConfirm?: string;
  nickname: string;
  address?: string;
  position?: string[];
  skills?: string[];
}

const SignUp = () => {
  const URL = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignProps>({ mode: "onChange" });

  const [pwd, setPwd] = useState("");
  const [address, setAdress] = useState("");
  const [position, setPosition] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const addressList: string[] = [
    "전체",
    "서울",
    "경기",
    "강원",
    "인천",
    "대전",
    "대구",
    "부산",
    "광주/전라",
    "제주",
  ];
  const positionList: string[] = [
    "전체",
    "백엔드",
    "프론트엔드",
    "서버",
    "소프트웨어",
    "안드로이드",
    "iOS",
    "DevOps",
    "시스템/네트워크",
    "빅데이터",
  ];

  const onValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdConfirm = e.target.value;
    if (pwd !== pwdConfirm) {
      setError(
        "pwConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else clearErrors("pwConfirm");
  };

  const handleSignSubmit: SubmitHandler<SignProps> = (data) => {
    const skillToString = skills.join(",");
    const positionToString = position.join(",");
    // console.log({ ...data, address, positionToString, skillToString });
    if (data.password !== data.pwConfirm) {
      setError(
        "pwConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    delete data.pwConfirm;
    axios
      .post(
        `${URL}/api/auth/register`,
        { ...data, address, position: positionToString, skills: skillToString },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("회원가입 응답", res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full md:max-w-[80%]">
        <div className="flex justify-center text-2xl font-light">회원가입</div>
        <form
          className="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-2 lg:w-full"
          onSubmit={handleSubmit(handleSignSubmit)}
        >
          <div className="flex flex-col">
            <div className="py-4 mb-6 font-bold border-b border-solid rounded-md outline-none border-slate-300">
              필수 입력 정보
            </div>
            <label className="mt-4 text-xs">이메일</label>
            <input
              type="email"
              placeholder="example@developers.com"
              className="sign_input"
              {...register("email", {
                required: "이메일을 올바르게 입력해주세요.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "이메일을 올바르게 입력해주세요.",
                },
              })}
            />
            <div className="text-xs text-red-500">{errors?.email?.message}</div>
            <label className="mt-4 text-xs">닉네임</label>
            <input
              placeholder="닉네임"
              className="sign_input"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "2자 이상 10자 이하의 닉네임을 입력해주세요.",
                },
                maxLength: {
                  value: 10,
                  message: "10자 이하의 닉네임을 입력해주세요",
                },
              })}
            />
            <div className="text-xs text-red-500">
              {errors?.nickname?.message}
            </div>
            <label className="mt-4 text-xs">비밀번호</label>
            <input
              type="password"
              placeholder="******"
              className="sign_input"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "6자 이상 18자 이하의 비밀번호를 입력해주세요.",
                },
                maxLength: {
                  value: 18,
                  message: "18자 이하의 비밀번호를 입력해주세요",
                },
              })}
              onChange={(e) => setPwd(e.target.value)}
            />
            <div className="text-xs text-red-500">
              {errors?.password?.message}
            </div>
            <label className="mt-4 text-xs">비밀번호 확인</label>
            <input
              type="password"
              placeholder="******"
              className="sign_input"
              {...register("pwConfirm", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "6자 이상 18자 이하의 비밀번호를 입력해주세요.",
                },
              })}
              onChange={onValid}
            />
            <div className="text-xs text-red-500">
              {errors?.pwConfirm ? errors?.pwConfirm?.message : ""}
            </div>
          </div>

          <div>
            <div className="py-4 mb-6 font-bold border-b border-solid rounded-md outline-none border-slate-300">
              추가 입력 정보
            </div>
            <label className="mt-4 text-xs">거주지</label>
            <Options label="거주지" lists={addressList} setState={setAdress} />
            <div className="flex justify-between">
              <label className="mt-4 text-xs">원하는 직무</label>
              <span className="mt-4 text-xs font-thin">최대 5개 선택 가능</span>
            </div>
            <MultiOptions
              label="직무"
              lists={positionList}
              state={position}
              setState={setPosition}
            />
            <div className="flex justify-between">
              <label className="mt-4 text-xs">주요 기술</label>
              <span className="mt-4 text-xs font-thin">
                최대 10개 선택 가능
              </span>
            </div>
            <TagInput
              tags={skills}
              setTags={setSkills}
              placeholder="예시) React, Java, Python (보유 기술명 입력)"
            />

            <button
              type="submit"
              className="sign_form_submit_btn bg-accent-400"
            >
              회원가입
            </button>
            <div className="flex justify-between font-light">
              이미 계정이 있으세요?
              <Link
                to="/login"
                className="font-semibold text-accent-300 hover:text-accent-500"
              >
                로그인
              </Link>
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-20 mb-8 font-light">
          소셜 계정으로 회원가입
        </div>
        <div className="flex justify-center">
          <NaverOauthBtn />
          <GoogleOauthBtn />
        </div>
      </div>
    </div>
  );
};
export default SignUp;
