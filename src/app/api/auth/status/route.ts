import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    return NextResponse.json({ isLogin: true });
  } else {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      const cookieStore = cookies();
      cookieStore.set("accessToken", sessionData.session.access_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: sessionData.session.expires_in,
      });
      return NextResponse.json({ isLogin: true });
    } else {
      return NextResponse.json({ isLogin: false });
    }
  }
}
