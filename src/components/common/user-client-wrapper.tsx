// User-Wrapper // klicken

"use client";

import { CardTextType } from "@/types/enum";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type UserCardSlugClientWrapperProps = {
  children: ReactNode;
  // cardTextType: CardTextType;
  slug: string;
};

const UserCardSlugClientWrapper: FC<UserCardSlugClientWrapperProps> = ({
  children,
  // cardTextType,
  slug,
}) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/user/${slug}`)}> {/**war inkl.`/${cardTextType}`*/}
      {children}
    </div>
  );
};

export default UserCardSlugClientWrapper;