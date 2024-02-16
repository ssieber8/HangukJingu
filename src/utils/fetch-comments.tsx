// Comments von dem Tip von der Frontpage holen

// "use client"

import MainPage from "@/components/pages/main-page";
import { FC, useEffect, useState } from "react";

import dataCommentFetch from "./data-comment-fetch";
import CommentPostCard from "@/components/cards/comments/comment-post-card";
import dataFetch from "./data-fetch";

type CommentsData = {
  id: number;
  comment_text: string;
  tip_id: number;
  user_id: number;
}

type FetchCommentsProps = {
  comments: CommentsData
}

const FetchComments: FC<FetchCommentsProps> = ({comments}) => {



{/*async function getAllComments() {
  return await dataFetch("/api/comments");
}*/}

// Async Componente um alle Tips zu holen.
// async function getCommentsOfOneTip(tip_id: string) {
//   const response = await fetch(`${process.env.BASE_URL}/api/comments/${tip_id}`) // Pfad kontrollieren!!!!!!!!!!!!!!!!!!! // ../../../backend/database/database.sqlite

//   return response.json()
// }

// Async Componente, die die Funktion von fetch-all-tips aufrufen kann.
{/*const FetchComments: FC = () => {
  const [commentsData, setCommentData] = useState<CommentsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllComments();
        setCommentData(data);
        console.log(data);
      } catch (error) {
        console.error("Fehler beim Abrufen von Comments:", error);
      }
    };
  }, []);*/}


  // const datacomments = await getComments(); // const datacomments: CommentsData[] = await getComments();
  // console.log("datacomments:", datacomments);

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16 mb-12">    
    {/* grid container */}
      <div className=""> {/*css !!!!!!!!!!!! */}
        <div>
          <CommentPostCard
            key={comments.id}
            comment_text={comments.comment_text}
            // slug={comments.id.toString()}
          />
        </div>
      </div>
    </MainPage>
  );
};

export default FetchComments;