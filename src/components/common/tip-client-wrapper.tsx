// Client-Wrapper Tips // klicken

"use client";

import { CardTextType } from "@/types/enum";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type CardSlugClientWrapperProps = {
  children: ReactNode;
  // cardTextType: CardTextType;
  slug: string;
};

const CardSlugClientWrapper: FC<CardSlugClientWrapperProps> = ({
  children,
  // cardTextType,
  slug,
}) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/location/${slug}`)}> {/**war inkl.`/${cardTextType}`*/}
      {children}
    </div>
  );
};

export default CardSlugClientWrapper;