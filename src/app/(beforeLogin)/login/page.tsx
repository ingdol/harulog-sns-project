"use client";
import Link from "next/link";
import { useState } from "react";
import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    try {
      const result = await login(formData);
      if (result.success) {
        router.replace("/");
      } else {
        setIsLoading(false);
        setErrorMessage("아이디나 비밀번호를 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setIsLoading(false);
      setErrorMessage("로그인 중 문제가 발생했습니다.");
    }
  }

  return (
    <div className="p-10 w-full max-w-md">
      <h2 className="font-poppins text-3xl font-bold">Sign In</h2>

      <form onSubmit={handleSubmit}>
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
        <div className="text-red-600 text-sm mt-4 min-h-[2.5rem]">
          {errorMessage && errorMessage}
        </div>
        <button
          className="w-full text-center bg-cyan-600 text-white text-lg font-medium py-3 rounded-xl shadow-sm hover:bg-cyan-700 transition duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-200 border-t-cyan-600 rounded-full animate-spin mr-2"></div>
          ) : (
            "로그인"
          )}
          {isLoading && "로그인 중..."}
        </button>
      </form>

      <div className="mt-4 text-right">
        <p className="text-sm text-gray-500 mt-2">
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
