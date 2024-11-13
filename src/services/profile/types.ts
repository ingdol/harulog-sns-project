import { IUser } from "../auth";
import { IFeed } from "../feed";

export interface IProfile {
  info: IUser;
  feeds: IFeed[];
}
