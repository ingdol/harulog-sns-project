"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const signData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(signData);

  if (data?.user) {
    const cookieStore = cookies();
    cookieStore.set("accessToken", data.session.access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: data.session.expires_in,
    });
    return { success: true };
  }

  if (error) {
    console.error("로그인 에러:", error.message);
    return { success: false, error: error?.message || "로그인 실패" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
