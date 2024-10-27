"use client";

import { useQuery } from "@tanstack/react-query";
import { type User } from "@supabase/supabase-js";
import { fetchProfile } from "../api";

export const useFetchProfile = ({ user }: { user: User | null }) => {
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile({ user }),
  });
};
