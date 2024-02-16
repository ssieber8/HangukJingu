// Update einzelner Tip

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
import { useSession } from "next-auth/react";

type TipData = {
  id: number;
  tip_name: string;
  tip_text: string;
  tipimage_URL: string;
  user_id: number;
}

type UpdateTipInputs = {
  tip_name: string;
  tip_text: string;
  tipimage_URL: FileList;
  // tipimage_id: File;
}

type UpdateTipProps = {
  params: {
    id: string;
  };
};

const UpdateTip: FC<UpdateTipProps> = ({params}) => {
  const { data: session } = useSession();
  console.log("UpdateTip mit session eingeloggggt:", session);

  const router = useRouter();

  if (!session) {
    console.error("No user session found");
    router.push("/")
    return;
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<UpdateTipInputs>(
    {
    defaultValues: {
      tip_name: "",
      tip_text: "",
      tipimage_URL: undefined,
    },
  });


  const [tipData, setTipData] = useState<TipData | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  const fetchTipData = async () => {
    try {

      if (session) {
        console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tip/${params.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });
    
          if (response.ok) {
            const updatetip = await response.json();
            setTipData(updatetip);
            setValue("tip_name", updatetip.tip_name);
            setValue("tip_text", updatetip.tip_text);
            // setValue("tipimage_URL", updatetip.tipimage_URL);
          } else {
            console.error("Failed to fetch tip data");
          }
      }
    } catch (error) {
      console.error("Error fetchning tip data:", error);
    }
  };

  useEffect(() => {
    fetchTipData();
  }, [params.id]);



  const updateTip = async (data: UpdateTipInputs) => {
    try {
      if (session) {
      const formData = new FormData();
      formData.append('tip_name', data.tip_name);
      formData.append('tip_text', data.tip_text);
      formData.append('tipimage_URL', data.tipimage_URL[0]);

      console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tip/${params.id}`, formData, {
        // method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${session?.access_token}`
        },
        // body: JSON.stringify(data),
      });
      console.log("Respooooooonse:", response);
        
      if (response.status === 200) {
        console.log("Tip update successful:", response);
        setSuccessMessage("Data update successful");
      } else {
        throw new Error(`Error updating tip: ${response.statusText}`);
      }
    }
   } catch (error) {
      console.error("Error updating tip:", error);
      setErrorMessage("Error data updating");
    }
  };



  const onSubmit: SubmitHandler<UpdateTipInputs> = async (data) => {
    console.log("Updatedata:", data);
    try {
        await updateTip(data);
    } catch (error) {
        console.error("Update tip failed:", error);
    }
  };



  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> {/*css!!!!!!!!!!!!!!!! */}
      <h1 className="text-2xl md:text-4xl xl:text-5xl">Update Tip</h1> {/*css!!!!!!!!!!!!!!!! */}
      {successMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{errorMessage}</div>
      )}
      <div className="relative">
        <div className="w-full relative mb-40 md:mb-0 md:h-screen">
          <Image src={seoul} alt="Parc in Southkorea" className="object-cover h-96 md:h-4/5"/>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          additionalClasses="" 
        > {/*css!!!!!!!!!!!!!!!! */}
          <div className="absolute top-40 md:top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center">
              <div className="w-full md:w-96  p-6 bg-pWhite rounded-lg shadow-md mt-12">
                <div className="text-xs md:text-sm xl:text-lg">
                  <FormInput additionalClasses=""
                    type="text"
                    placeholder="Tipname"
                    register={register("tip_name", { 
                      required: "Tipname is required.",
                      minLength: {
                        value: 3,
                        message: "Tipname must be at least 3 characters long."
                      }
                    })}
                    errors={errors.tip_name}
                  /> <br />
                  <textarea
                    placeholder="Tiptext"
                    {...register("tip_text", { 
                      required: "Tiptext is required.",
                      minLength: {
                        value: 3,
                        message: "Tiptext must be at least 3 characters long."
                      },
                      maxLength: {
                        value: 150,
                        message: "Tiptext must be not more than 150 characters long."
                      }
                    })}
                    />
                    {errors.tip_text && <span>{errors.tip_text.message}</span>}
                  <br />
                  <FormInput additionalClasses="mt-5"
                  type="file"
                  placeholder="Choose an image"
                  register={register("tipimage_URL", { 
                    required: "Tipimage is required.",
                  })}
                  errors={errors.tipimage_URL}
                  /> <br />
                  <div className="bg-pYellow border-pBrown border-2 w-1/3 text-center rounded-lg">
                    <FormButton type="submit" text="Update Tip" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </MainPage>
  );
};

export default UpdateTip;