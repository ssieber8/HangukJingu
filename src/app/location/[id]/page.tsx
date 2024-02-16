// Der einzelne Tip

"use client"

import MainPage from "@/components/pages/main-page";
import { FC, useEffect, useState } from "react";

import FetchOneTip from "@/utils/fetch-tip";
import FetchComments from "@/utils/fetch-comments";
import CreateComment from "@/utils/create-comment";
import Link from "next/link";
import Image from "next/image";
import tip from './../../../public/assets/about_me.jpg'
import user from '/public/assets/userlogo.png'
import dataOneFetch from "@/utils/data-one-fetch";
import { useSession } from "next-auth/react";
import { deleteTip } from "@/components/cards/tips/delete-one-tip";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/components/cards/comments/delete-comments";
import UpdateComment from "@/components/cards/comments/update-comments";
import axios from "axios";
// import UpdateComment from "@/app/update_comment/[id]/page";
// import { updateTip } from "@/utils/update-tip";

export type TipsData = {
  id: string;
  tip_name: string;
  tip_text: string;
  user_id: string;
  tipimage_id: number;
  tipimage_URL: string;
};

type UserData = {
  id: string;
  userimage_URL: string;
}

type CommentsData = {
  id: string;
  comment_text: string;
  tip_id: number;
  user_id: string;
  user_data: UserData;
}

export async function getUserData(id: string): Promise<UserData> {
  try {
  //console.log("baseurlimage:", process.env.NEXT_PUBLIC_BASE_URL)
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);
  //console.log("Useeeeer:" , `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);
  const userDatas = await userResponse.json();
  console.log("userdatas:", userDatas)
  return userDatas;
} catch (error) {
  console.error("Error fetching user data:", error);
    throw error;
}
}


export async function getOneTip(id:string) : Promise<TipsData> {
  //console.log("baseurltip:", process.env.NEXT_PUBLIC_BASE_URL)
   const tipResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tip/${id}`)
   //console.log("Tiippppppp:" , `${process.env.NEXT_PUBLIC_BASE_URL}/api/tip/${id}`);
   return tipResponse.json()

}

export async function getTipComments(tipId: string): Promise<CommentsData[]> {
  try {
  //console.log("baseurltipcomments:", process.env.NEXT_PUBLIC_BASE_URL)
  const commentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${tipId}`);
  //console.log("Commmmmeeeent:" , `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?/${tipId}`);
  const comments: CommentsData[] = await commentResponse.json();

  const commentsDataPromises = comments.map(async (comment) => {
    
    try {
    const userData = await getUserData(comment.user_id);
    console.log("wo sind die userDataaaaaa:", userData);
    if (userData) {
      return {...comment, user_data: userData};
    } else {
      return {...comment, user_data: { id: "", userimage_URL: "" }};
    }
  } catch (error) {
    console.error("Error fetching user data for comment:", error);
    throw error;
  }
    
  });
  //console.log("userData wo;", commentsDataPromises)
  const commentsWithUserData = await Promise.all(commentsDataPromises);
  return commentsWithUserData;
} catch (error) {
  console.error("Error fetching comments with user data:", error);
  throw error;
}

}

type OneTipProps = {
  params: {
    id: string;
  };
};

























{/*async function getTipComments(id:string) {
  const commentResponse = await fetch(`${process.env.BASE_URL}/api/comments/${id}`)
  console.log(`${process.env.BASE_URL}/api/comments/${id}`);
  return commentResponse.json()
}*/}


// Async Componente, die die Funktion von fetch-tip aufrufen kann.
const OneTip: FC<OneTipProps> = ({params}) => {
 const [tipData, setTipData] = useState<TipsData | null>(null);
 const [commentData, setCommentData] = useState<CommentsData[]>([]);
 // const [userData, setUserData] = useState<UserData | null>(null);


const [successMessage, setSuccessMessage] = useState<string | null>(null);
const [errorMessage, setErrorMessage] = useState<string | null>(null);


const {data: session, status } = useSession();
console.log("Comments page:", session);

 useEffect(() => {
  const fetchData = async () => {
    try {
    const tip = await getOneTip(params.id);
    setTipData(tip);

    const comments = await getTipComments(params.id);
    setCommentData(comments);
    } catch (error) {
      console.error("Error fetching comments with user data:", error);
      setErrorMessage("Error fetching comments with user data");
    }
  };

  fetchData();
}, [params.id]);







 // const commentData: CommentsData = await getTipComments(params.id)
  
  //const datatip: TipsData[] = await GetOneTip(params.id);
  //console.log(datatip)
  

  {/*const {data: session, status } = useSession();
  useEffect(() => {
    console.log("User von der Einzeltippage:", session);
  }, [])*/}


  {/*const handleUpdate = async () => {
    const newData = {

    };

    const updatedTip = await updateTip(params.id, newData);

    console.log("Updated Tip:", updatedTip);
  };*/}



  const router = useRouter();

  const handleDeleteTip = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tip?")) {
      try {
        const userId = session?.user.id 

        if(!userId) {
          console.error("User not authenticated.");
          return;
        }
        console.log("baseurl1:", process.env.NEXT_PUBLIC_BASE_URL)
        const tipResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tip/${id}`)
        console.log("Tiiiiip:", tipResponse);
        const tipData = await tipResponse.json();

        {/*if(tipData.user.id !== userId) {
          console.error("You are not the owner of this tip.");
          return;
        }*/}
        console.log("baseurl2:", process.env.NEXT_PUBLIC_BASE_URL)
        const deleteTipResponse = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tips`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          data: {
            id: params.id
          }
        });

        console.log("Delete RESPONSE:", deleteTipResponse)

        if (deleteTipResponse.status === 200) {
          // const tips = await getOneTip(id);
          // setTipData(tips);
          console.log(`Tip mit ID ${id} erfolgreich gelöscht`);
          setSuccessMessage("Tip successfully deleted")
        } else {
          console.error(`Löschen des Tips mit der ID ${id} fehlgeschlagen`);
          throw new Error(`Failed to delete tip with ID ${id}`);
        }
      } catch (error) {
        console.error("Error deleting tip:", error);
        setErrorMessage("Error deleting tip");
      }
        
      } else {
        console.error("Error deleting tip:");
      } 
    };

  const handleDeleteComment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const userId = session?.user.id

        if (!userId) {
          console.error("User not authenticated.");
          return;
        }
        console.log("baseurl1:", process.env.NEXT_PUBLIC_BASE_URL)
        const commentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`) 
        const commentData = await commentResponse.json();

        if(commentData.user_id !== userId) {
          console.error("You are not the owner of this comment.");
          return;
        }
        console.log("baseurl2:", process.env.NEXT_PUBLIC_BASE_URL)
        const deleteResponse = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          data: {
            id: id
          }
        });

       

        console.log("Delete RESPONSE:", deleteResponse);

        if (deleteResponse.status === 200) {
          const comments = await getTipComments(params.id);
          setCommentData(comments);
          console.log(`Comment mit ID ${id} erfolgreich gelöscht`);
          setSuccessMessage("Comment successfully deleted")
        } else {
          console.error(`Löschen des Commentss mit der ID ${id} fehlgeschlagen`);
          throw new Error(`Failed to delete comment with ID ${id}`);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        setErrorMessage("Error deleting comment");
      }
        
      } else {
        console.error("Error deleting comment:");
      } 
    };
  





    {/*const handleUpdateComment = async (id: string) => {
        try {
          const userId = session?.user.id
  
          if (!userId) {
            console.error("User not authenticated.");
            return;
          }
          const commentResponse = await fetch(`http://127.0.0.1:8000/api/comment/${id}`) 
          const commentData = await commentResponse.json();
  
          if(commentData.user_id !== userId) {
            console.error("You are not the owner of this comment.");
            return;
          }
          const updateResponse = await fetch(`http://127.0.0.1:8000/api/comment/${id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            }
          });

  
          if (updateResponse.ok) {
            const comments = await getTipComments(params.id);
            setCommentData(comments);
            console.log(`Comment mit ID ${id} erfolgreich upgedatet`);
          } else {
            console.error(`Update des Commentss mit der ID ${id} fehlgeschlagen`);
            throw new Error(`Failed to updatee comment with ID ${id}`);
          }
        } catch (error) {
          console.error("Error updating comment:", error);
          throw error;
        }
      };*/}
    
      console.log("Comment datadatatat:", commentData);

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16 mb-12">
      {/*Nur für ADMIN!!!!!*/}
        {session && session.user.is_admin ? (
          <>
            <div className="absolute right-60 top-44 md:top-44 xl:top-44 text-sm md:text-lg xl:text-xl p-3 bg-pBrown text-pOrange w-40 sm:w-48 rounded-3xl text-center mt-10 mb-20">
              <Link href={`/update_tip/${params.id}`}>
                <div className="">Update tip</div>
              </Link>
            </div>
            <div className="absolute right-10 top-44 md:top-44 xl:top-44 text-sm md:text-lg xl:text-xl p-3 bg-pOrange text-pBrown w-40 sm:w-48 rounded-3xl text-center mt-10 mb-20">
              <button onClick={() => handleDeleteTip(params.id)}>Delete tip</button>
            </div>
            </>
            ) : (
            <>
            </>
            )}
      <h1 className="text-2xl md:text-4xl xl:text-5xl">{tipData && tipData.tip_name}</h1>
      
      {successMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{errorMessage}</div>
      )}



    
    {/* grid container */}
    {tipData && (
      <div className="">
        <FetchOneTip tip={tipData}/>
      </div>
    )}



     {/*Nur für ADMIN!!!!!*/}
     {session && session.user.is_admin ? (
          <>
            
            </>
            ) : (
            <>
            </>
            )}





<div className="mt-6 text-xl flex justify-normal font-bold mb-10">
      <p>Do you want to join the HangukJingu community and share your experience? Register 
        <Link href="/register" className="ml-2 underline">here</Link> 
      </p>
    </div>


      



            {/*Für User!!!!!*/}
            {session ? (
            <>
             <div>
                {tipData && (
                  <CreateComment tipId={tipData.id} />
                )}
        
              </div>
            </>
            ) : (
            <>
            </>
            )}






  



{commentData.length > 0 ? (
        <div>
          <h3 className="text-lg md:text-2xl xl:text-4xl">Comments:</h3>
          <div className="text-sm md:text-lg xl:text-2xl mt-5 mb-20">
                <ul>
                {commentData.map((comment) => (
                  <li key={comment.id} className="mb-14 sm:mb-10">
                    <div className="flex gap-10">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 relative">
                        {comment.user_data.userimage_URL ? (
                            <Image src={comment.user_data.userimage_URL} alt="User Image" fill  className="object-cover"/>
                          ) : (
                            <>
                            <div className="">
                              <Image src={user} alt="Userprofile" fill layout="responsive" className="rounded-full object-cover"/>
                            </div>
                            </>
                          )}      
                      </div>            
                      <div className="">{comment.comment_text}</div>
                    </div>
                    {/* Für User */}
                    {session?.user.id === comment.user_id && (
                      <div className="relative">
                        <div>
                          {commentData && (
                            <UpdateComment id={comment.id} />
                          )}
                  
                        </div>
                        <div className="absolute top-24 sm:top-11 md:top-14 xl:top-16 sm:left-60 text-sm md:text-lg xl:text-xl p-3 bg-pOrange text-pBrown w-40 sm:w-48 rounded-3xl text-center mb-20">
                          <button onClick={() => handleDeleteComment(comment.id)}>Delete comment</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
                </ul>
            
          </div>
          
        </div>
      ) : (
        <div>
          <h3 className="text-sm md:text-2xl xl:text-4xl">Comments:</h3>
          <p className="text-sm md:text-lg xl:text-2xl mt-5 mb-20">No comments available.</p>
        </div>
        
      )}


     







         



    





    </MainPage>
  );
};

export default OneTip;