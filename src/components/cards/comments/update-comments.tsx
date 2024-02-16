// Update Comment

"use client"

import MainPage from "@/components/pages/main-page";
import { FC, useEffect, useState } from "react";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/form-input";
import FormButton from "@/components/forms/form-button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type CommentsData = {
  id: string;
  comment_text: string;
  tip_id: number;
  user_id: number;
};

type UpdateCommentInputs = {
  comment_text: string;
};


type UpdateCommentProps = {
  id: string;
};


// Async Componente, die die Funktion von fetch-tip aufrufen kann.
const UpdateComment: FC<UpdateCommentProps> = ({id}) => {

  const {data: session, status } = useSession();
  console.log("User Frontpage eingeloggt:", session);

  const {
    register,
    handleSubmit,
    watch, 
    setValue,
    formState: {errors},
  } = useForm<UpdateCommentInputs>({
    defaultValues: {
      comment_text: "",
    },
  });

  const router = useRouter();





  const [commentData, setCommentData] = useState<CommentsData | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  {/*const fetchCommentData = async () => {
    try {

      if (!session) {
        console.error("No user session found");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/comment/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

      if (response.ok) {
        const updatecomment = await response.json();
        setCommentData(updatecomment);
        setValue("comment_text", updatecomment.comment_text);
      } else {
        console.error("Failed to fetch comment data");
      }
    } catch (error) {
      console.error("Error fetchning comment data:", error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [id]);*/}



  const updateComment = async (data: UpdateCommentInputs) => {
    try {
      console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(data),
      });
        
      if (response.ok) {
        console.log("Comment update successful:", response);
        setSuccessMessage("Data update successful");
        // router.push(`/tip/${id}`);
      } else {
        throw new Error(`Error updating comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      setErrorMessage("Error data updating");
    }
  };





  const onSubmit: SubmitHandler<UpdateCommentInputs> = async (data) => {
    console.log("Createdatacomment:", data);
    try {
      await updateComment(data);
  } catch (error) {
        console.log("Update comment failed:", error);
    }
  };
  

  {/*const {data: session, status } = useSession();
  useEffect(() => {
    console.log("User von der Einzeltippage:", session);
  }, [])*/}
  

  return (
    <MainPage additionalClasses="">
      <div className="mb-20 mt-5">
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-sm md:text-lg xl:text-xl">
              <FormInput additionalClasses=""
                type="text"
                placeholder="Comment..."
                register={register("comment_text")}
              /> {" "} <br />
              {/*<FormInput additionalClasses=""
                type="text"
                placeholder="ID please"
                register={register("tip_id")}
                /> {" "} <br />*/}
              <div className="text-sm md:text-lg xl:text-xl p-3 bg-pBrown text-pOrange w-40 sm:w-48 rounded-3xl text-center">
                <FormButton type="submit" text="Update comment" />
              </div>
              
          </div>
        </Form>
        <br />
        {successMessage && (
        <div className="text-sm md:text-lg xl:text-2xl font-bold">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-sm md:text-lg xl:text-2xl font-bold">{errorMessage}</div>
      )}
  </div>


    </MainPage>
  );
};

export default UpdateComment;