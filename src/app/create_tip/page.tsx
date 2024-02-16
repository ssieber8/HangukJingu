// Create einzelner Tip

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

import seoul from './../../../public/assets/user.jpg'
import { useSession } from "next-auth/react";

type TipInputs = {
  // user_id: string;
  tip_name: string;
  tip_text: string;
  tipimage_URL: FileList;
  // tipimage_id: File;
}

const NewTip: FC = () => {
  const { data: session } = useSession();
  console.log("CreateTip mit session eingeloggggt:", session);

  
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
  } = useForm<TipInputs>({
    defaultValues: {
      // user_id: session.user.id,
      tip_name: "",
      tip_text: "",
      tipimage_URL: undefined,
    },
  });



  // const tipimage_URL = watch("tipimage_URL");

  // const [file, setFile] = useState<File | null>(null);


  {/*}
  // Funktion zum Herunterladen der Datei von der URL und Umwandlung in ein Blob
  const fetchAndConvertToFile = async (url: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Erstelle eine neue Datei mit dem Blob
      const convertedFile = new File([blob], "filename");

      // Setze die Datei im State
      setFile(convertedFile);
    } catch (error) {
      console.error("Error fetching or converting file:", error);
    }
  };

  // Rufe die Funktion in useEffect auf, wenn die URL sich ändert
  useEffect(() => {
    if (tipimage_URL) {
      fetchAndConvertToFile(tipimage_URL);
    }
  }, [tipimage_URL]);
*/}


const [successMessage, setSuccessMessage] = useState<string | null>(null);
const [errorMessage, setErrorMessage] = useState<string | null>(null);

const createTip = async (data: TipInputs) => {
  try {
   if (session) {

      const formData = new FormData();
      formData.append("tip_name", data.tip_name);
      formData.append("tip_text", data.tip_text);
      formData.append("tipimage_URL", data.tipimage_URL[0]);

      console.log("baseurlcreate:", process.env.NEXT_PUBLIC_BASE_URL)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tips`, formData,  {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${session?.access_token}`
        },
      }); // wieso kann nicht auf die route zugegriffen werden
      console.log("Respoooooonse:", response);

      
    if (response.status === 201) {
      console.log("Tip create successful:", response);
      setSuccessMessage("Data create successful");
    } else {
      throw new Error(`Error creating tip: ${response.statusText}`);
    }
  } 
}
catch (error) {

  console.error("Error creating tipppppppp:", error);
  setErrorMessage("Error data creating");
}};


  const onSubmit: SubmitHandler<TipInputs> = async (data) => {
    console.log("Createdata:", data);
    try {
      await createTip(data);
  } catch (error) {
      console.error("Create tippppppp failed:", error);
  }
    
  };




  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> {/*css!!!!!!!!!!!!!!!! */}
      <h1 className="text-2xl md:text-4xl xl:text-5xl">Create Tip</h1> {/*css!!!!!!!!!!!!!!!! */}
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
                    /> <br />
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
                  {/*<input
                    type= "text"
                    placeholder= "Choose a file"
                    {...register("tipimage_URL", {
                      required: "Tipimage is required.",
                        minLength: {
                          value: 3,
                          message: "TipImage must be at least 3 characters long."
                      }
                    })}
                  /> <br />*/}
                  {/*} <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  /> <br />*/}
                  <div className="bg-pYellow border-pBrown border-2 w-1/3 text-center rounded-lg">
                    <FormButton type="submit" text="Create Tip" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </MainPage>
  );








  {/*return (
    <div>Hello</div>
  );*/}
};

export default NewTip;