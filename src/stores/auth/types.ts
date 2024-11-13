import { IUser } from "@/services/auth";

export interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  checkLoginStatus: () => Promise<void>;
  //   logout: () => void;
  //   setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
}
