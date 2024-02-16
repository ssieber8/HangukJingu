// Update eines einzelnen Comments

"use client"

import Form from "@/components/forms/form";
import MainPage from "@/components/pages/main-page";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/forms/form-input";
import FormButton from "@/components/forms/form-button";

import seoul from './../../../../public/assets/user.jpg'
import { fetchData } from "next-auth/client/_utils";
import { useSession } from "next-auth/react";

type CommentData = {
  id: number;
  comment_text: string;
  tip_id: number;
  user_id: number;
}

type UpdateCommentInputs = {
  comment_text: string;
  // tip_id: number;
};

type UpdateCommentProps = {
  params: {
    id: string;
  }
}

const UpdateComment: FC<UpdateCommentProps> = ({params}) => {
  const { data: session } = useSession();
  console.log("UpdateComment mit session eingeloggggt:", session);

  const router = useRouter();

  const { 
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<UpdateCommentInputs>({
    defaultValues: {
      comment_text: "",
    },
  });

  const [commentData, setCommentData] = useState<CommentData | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCommentData = async () => {
    try {

      if (session) {
        const response = await fetch(`http://127.0.0.1:8000/api/comment/${params.id}`, {
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
      }
    } catch (error) {
      console.error("Error fetchning comment data:", error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [params.id]);



  const updateComment = async (data: UpdateCommentInputs) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comment/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(data),
      });
        
      if (response.ok) {
        console.log("Comment update successful:", response);
        setSuccessMessage("Comment update successful");
      } else {
        throw new Error(`Error updating comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      setErrorMessage("Error updating comment");
    }
  };




  const onSubmit: SubmitHandler<UpdateCommentInputs> = async (data) => {
    console.log("UpdateData:", data);
    try {
      await updateComment(data);
    } catch (error) {
      console.error("Update comment failed:", error);
    }
  };
      

        

      


  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> {/*css!!!!!!!!!!!!!!!! */}
      {successMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{errorMessage}</div>
      )}
      <div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
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
              <FormButton type="submit" text="send comment" />
          </div>
        </Form>
      </div>
    </MainPage>
  );








  {/*return (
    <div>Hello</div>
  );*/}
};

export default UpdateComment;