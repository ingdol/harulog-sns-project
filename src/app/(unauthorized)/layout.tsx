import Logo from "@/components/Logo";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-screen flex flex-wrap w-full">
      <div className="absolute flex items-center gap-1 p-6">
        <Logo />
      </div>
      <div className="flex lg:flex-row w-full h-full">
        <div className="relative hidden lg:flex justify-center h-full w-1/2 px-6 lg:px-20">
          <div className="flex items-center justify-center">
            <div className="pr-20 pb-28">
              <h2 className="font-poppins text-5xl font-semibold">
                your moments
              </h2>
              <div className="mt-1">
                <span className="font-poppins text-5xl font-semibold pr-2">
                  with
                </span>
                <span className="text-7xl font-semibold text-cyan-600">
                  HaruLog
                </span>
              </div>
              <p className="text-2xl text-gray-500 mt-5">
                오늘 당신의 하루는 어떠셨나요?
              </p>
              <p className="text-lg mt-10">
                계정이 없으신가요? <br />
                지금 바로{" "}
                <Link
                  href="/signup"
                  className="text-cyan-600 font-semibold hover:underline"
                >
                  회원가입
                </Link>{" "}
                하세요!
              </p>
            </div>
          </div>
          <img
            src="/images/login-illustration.svg"
            alt="Login illustration"
            className="absolute right-0 bottom-5 lg:w-2/5 md:w-1/3"
          />
        </div>
        <div className="w-full flex items-center justify-center lg:w-1/2 bg-white px-6 lg:px-20">
          {children}
        </div>
      </div>
    </div>
  );
}
