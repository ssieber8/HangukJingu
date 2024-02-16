// Client-Wrapper Comments // klicken

"use client";

import { CardTextType } from "@/types/enum";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type CommentCardSlugClientWrapperProps = {
  children: ReactNode;
  // cardTextType: CardTextType;
  slug?: string;
};

const CommentCardSlugClientWrapper: FC<CommentCardSlugClientWrapperProps> = ({
  children,
  // cardTextType,
  slug,
}) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/${slug}`)}> {/**war inkl.`/${cardTextType}`*/}
      {children}
    </div>
  );
};

export default CommentCardSlugClientWrapper;