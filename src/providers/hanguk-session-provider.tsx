// Session Provider

"use client"

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type HangukSessionProviderProps = {
  children: ReactNode;
};

const HangukSessionProvider: FC<HangukSessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default HangukSessionProvider;