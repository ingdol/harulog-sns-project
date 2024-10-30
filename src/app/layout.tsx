import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../static/fonts/style.css";
import TanstackQueryClientProvider from "@/providers/TanstackQueryClientProvider";

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Harulog",
  description: "Harulog SNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
      </body>
    </html>
  );
}
