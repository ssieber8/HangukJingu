// Create Comment

"use client"

import MainPage from "@/components/pages/main-page";
import { FC, useState } from "react";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/form-input";
import FormButton from "@/components/forms/form-button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export type TipsData = {
  id: number;
  tip_name: string;
  tip_text: string;
  user_id: number;
  tipimage_id: number;
  tipimage_URL: string;
};

type CommentInputs = {
  comment_text: string;
  tip_id: string;
};


type CreateCommentProps = {
  tipId: string;
};



export async function getOneTip(id:string) : Promise<TipsData> {
  const tipResponse = await fetch(`${process.env.BASE_URL}/api/tip/${id}`) // ${process.env.BASE_URL}
  console.log("Tiipppppppiiiitip:" , `${process.env.BASE_URL}/api/tip/${id}`);
  return tipResponse.json()

}

// Async Componente, die die Funktion von fetch-tip aufrufen kann.
const CreateComment: FC<CreateCommentProps> = ({tipId}) => {

  const {data: session, status } = useSession();
  console.log("User Frontpage eingeloggt:", session);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<CommentInputs>({
    defaultValues: {
      comment_text: "",
      tip_id: tipId,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CommentInputs> = async (data) => {
    console.log("Createdatacomment:", data);
    try {
      if (session) {
        console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, data, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }); 
      console.log("Respoooooonse Comment:", response);
        if (response.status === 201) {
          console.log ("Create comment successful:", response)
          setSuccessMessage("Create comment successful")
          // router.push("/");
        }
    } else {
      console.error("User is not authenticated or does not have a valid token.");
    } 
  } catch (error) {
        console.log("Create comment failed:", error);
        setErrorMessage("Error creating comment");
    }
  }
  

  {/*const {data: session, status } = useSession();
  useEffect(() => {
    console.log("User von der Einzeltippage:", session);
  }, [])*/}
  

  return (
    <MainPage additionalClasses="" >
      {successMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{errorMessage}</div>
      )}

      <div className="mb-20 mt-20">
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
              <FormButton type="submit" text="Send comment"/>
            </div> 
          </div>
        </Form>
  </div>


    </MainPage>
  );
};

export default CreateComment;