"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const signupData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        nickname: formData.get("nickname") as string,
        profile_image: null,
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(signupData);

  if (data?.session) {
    const cookieStore = cookies();
    cookieStore.set("accessToken", data.session.access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: data.session.expires_in,
    });
  }
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
