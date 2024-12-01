import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const fetchProfile = async ({ user }: { user: User | null }) => {
  const supabase = createClient();

  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("id, email, nickname, profile_image")
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) {
      console.error("Profile fetch error:", error.message);
      throw error;
    }

    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("API call error:", error);
    redirect("/error");
  }
};
