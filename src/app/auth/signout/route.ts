import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  const cookieStore = cookies();
  cookieStore.set("accessToken", "", {
    path: "/",
    expires: new Date(0),
  });
  revalidatePath("/", "layout");
  return NextResponse.redirect(new URL("/login", req.url), {
    status: 302,
  });
}
