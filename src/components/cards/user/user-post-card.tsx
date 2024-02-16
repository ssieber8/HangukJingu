// User

import UserCardSlugClientWrapper from "@/components/common/user-client-wrapper";
import UserImage from "@/components/common/user-image";
import { CardTextType } from "@/types/enum";
import { FC } from "react";
import UserOverviewText from "./user-overview-text";



type UserPostCardProps = {
  slug: string;
  id?: number;
  username: string;
  user_image_url: string;
};

const UserPostCard: FC<UserPostCardProps> = ({
  slug,
  id,
  username,
  user_image_url,
}) => {

  return (
    <div className="mb-20">
      <div
      className="w-80" // css + style !!!!!!!!!!!!!!
    >
      <UserCardSlugClientWrapper
        slug={slug}
        // cardTextType={CardTextType.TIPS}
  >
      <div className="relative">
        <UserImage
          className="rounded-md"
          additionalClasses="" // css !!!!!!!!!!!
          imageUrl={user_image_url}
          alt={`User image for ${username}`}
        />
        <div className="absolute top-0 p-2 bg-white w-3/4">
          <UserOverviewText
            username={username} 
            additionalClasses=""
          />
        </div>
      </div>
      </UserCardSlugClientWrapper>
    </div>
    
    </div>
    
  );
};

export default UserPostCard;