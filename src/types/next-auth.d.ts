// Details zum auth token

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Retourniert von "useSession" und "getSession" 
   * und empfang als ein prop für den React Context "SessionProvider"
   */
  interface Session {
    access_token?: string;
    user:{
      id?: string;
      name?: string; 
      email?: string;
      username?: string;
      image?: string;
      is_admin?: boolean;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}