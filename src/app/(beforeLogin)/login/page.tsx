import Link from "next/link";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="p-10 w-full max-w-md">
      <h2 className="font-poppins text-3xl font-bold">Sign In</h2>

      <form>
        <div className="mt-8">
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
        <div className="mt-8">
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
        <button
          className="w-full text-center bg-cyan-600 text-white text-lg font-medium py-3 rounded-xl shadow-sm hover:bg-cyan-700 transition duration-200 mt-14"
          formAction={login}
        >
          로그인
        </button>
      </form>

      <div className="mt-8 text-right">
        <p className="text-sm text-gray-500">
          <span className="font-poppins">HaruLog</span>가 처음이세요?{" "}
          <Link
            href="/signup"
            className="text-cyan-600 font-medium hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
