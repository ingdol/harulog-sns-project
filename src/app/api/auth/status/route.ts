import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    return NextResponse.json({ isLogin: true });
  } else {
    return NextResponse.json({ isLogin: false });
  }
}
