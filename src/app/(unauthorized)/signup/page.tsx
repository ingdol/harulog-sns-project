import { signup } from "./actios";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="p-10 w-full max-w-md">
      <h2 className="font-poppins text-3xl font-bold mb-8">Sign Up</h2>
      <form>
        <div className="flex flex-col gap-4">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="w-full input-field"
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="nickname">
              Nickname
            </label>
            <input
              className="w-full input-field"
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="w-full input-field"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full input-field"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              required
            />
          </div>
        </div>

        <button
          className="w-full text-center bg-cyan-600 text-white text-lg font-medium py-3 rounded-xl shadow-sm hover:bg-cyan-700 transition duration-200 mt-14"
          formAction={signup}
        >
          회원가입
        </button>
      </form>

      <div className="mt-8 text-right">
        <p className="text-sm text-gray-500">
          <span className="font-poppins">HaruLog</span> 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-cyan-600 font-medium hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
