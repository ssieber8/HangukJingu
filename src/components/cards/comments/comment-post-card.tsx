// Comments

import { CardTextType } from "@/types/enum";
import { FC } from "react";
import CommentCardSlugClientWrapper from "@/components/common/comments-client-wrapper";
import Comments from "@/components/cards/comments/comments-overview-text";

type CommentPostCardProps = {
  slug?: string;
  id?: number;
  comment_text: string;
  // tip_image: string | undefined;
  // tip: TipsData;
};

const CommentPostCard: FC<CommentPostCardProps> = ({
  // tip
  slug,
  id,
  // tip_image,
  comment_text,
}) => {

  // console.log("CommentPostCard Props:", comment_text);

  return (
    <div
      className="" // css + style !!!!!!!!!!!!!!
    >
      <CommentCardSlugClientWrapper
        slug={slug}
        // cardTextType={CardTextType.TIPS}
  >
        <Comments
          comment_text={comment_text}
        />
      </CommentCardSlugClientWrapper>
    </div>
  );
};

export default CommentPostCard;