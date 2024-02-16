// Registrier Page

"use client"

import Form from "@/components/forms/form";
import FormButton from "@/components/forms/form-button";
import FormInput from "@/components/forms/form-input";
import MainPage from "@/components/pages/main-page";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import seoul from './../../../../public/assets/user.jpg'

type RegisterInputs = {
 username: string;
 email: string;
 password: string;
 repeatPassword: string; 
};

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<RegisterInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  // watch den Wert vom Passwort
  // so können wir das mit dem repeatPassword vergleichen
  const password = watch("password");

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      // response create
      // Kommunikation mit den vorherigen erstellten api route /src/app/api/auth/register
      const response = await axios.post("/api/auth/register", data);
      // console.log(response);

      // check ob die response erfolgreich war
      if (response.status === 200) {
        // weiterleiten zu login page
        console.log('Register successful:', response)
        router.push("/login");
      }
    } catch (response) {
      // wenn es einen error gibt
      console.log('Register failed:', response);
    }
  };

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> {/*css!!!!!!!!!!!!!!!! */}
      <h1 className="text-2xl md:text-4xl xl:text-5xl">Register</h1> {/*css!!!!!!!!!!!!!!!! */}
      <div className="relative">
        <div className="w-full relative">
          <Image src={seoul} alt="Parc in Southkorea" className="object-cover h-screen w-full"/>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          additionalClasses="" 
        > {/*css!!!!!!!!!!!!!!!! */}
          <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 p-6 bg-pWhite rounded-lg shadow-md"> {/*css KONTROLLE!!!!!!!!!!!!!!!! */}
                <p className="text-sm md:text-lg xl:text-2xl"> {/*css!!!!!!!!!!!!!!!! */}
                  Do you want to join the HangukJingu community? <br /> <br />
                  Register down below
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 p-6 bg-pWhite rounded-lg shadow-md mt-12">
                <div className="text-xs md:text-sm xl:text-lg">
                  <FormInput additionalClasses=""
                    type="text"
                    placeholder="Username"
                    register={register("username", { 
                      required: "Username is required.",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters long."
                      }
                    })}
                    errors={errors.username}
                  /> <br />
                  <FormInput 
                    type="text"
                    placeholder="E-Mail"
                    register={register("email", { 
                      required: "E-Mail is required." ,
                      pattern: {
                        value: /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/,
                        message: "Invalid email adress",
                      },
                    })}
                    errors={errors.email}
                  /> <br />
                  <FormInput 
                    type= "password"
                    placeholder= "Password"
                    register={register("password", {
                      required: "Password is required.", 
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
                      }
                    })} 
                    errors={errors.password}
                  /> <br />
                  <FormInput 
                    type= "password"
                    placeholder= "Repeat Password"
                    register={register("repeatPassword", {
                      required: "Please repeat your password.",
                      validate: (value) =>
                        value === password || "The passwords do not match.",
                    })}
                    errors={errors.repeatPassword}
                  /> <br />
                  <div className="bg-pBrown text-pOrange w-20 text-center rounded-lg">
                    <FormButton type="submit" text="Register" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <button 
            onClick={() => router.push("/login")}
            className="mt-12 text-sm md:text-lg xl:text-2xl mb-4 md:mb-8 xl:mb-12 font-bold"
          > {/*css!!!!!!!!!!!!!!! */}
            You have already an account? Login here!
          </button>
        </Form>
      </div>
    </MainPage>
  );
};

export default RegisterPage;