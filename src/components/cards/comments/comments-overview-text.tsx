// Comments vom Tip

import { FC } from "react";

type CommentsProps = {
  additionalClasses?: string;
  id?: number;
  comment_text: string;
};

const Comments: FC<CommentsProps> = ({
  additionalClasses,
  id,
  comment_text,
}) => {
  // Direkte Umwandlung der ID in die Comment_URL
  // const CommentUrl = `${process.env.NEXTAUTH_URL}/api/comments/${tip_id}` // Andere URL?????
  return (
    <div className={""}> 
      {/*Comments*/}
      {comment_text}
    </div>
  );
};

export default Comments;