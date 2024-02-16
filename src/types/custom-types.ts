import { ISODateString } from "next-auth";

export interface CustomSession {
  user?: {
    id?: string | null ;
    username?: string | null;
    email?: string | null;
    is_admin?: boolean | null;
  };
  access_token?: string | undefined;
  expires: ISODateString;
}