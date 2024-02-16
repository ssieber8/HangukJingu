// Login Page

"use client"

import Form from "@/components/forms/form";
import FormButton from "@/components/forms/form-button";
import FormInput from "@/components/forms/form-input";
import MainPage from "@/components/pages/main-page";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import seoul from './../../../../public/assets/user.jpg'

type LoginInputs = {
  username: string;
  password: string;
};

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const user = null

  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { data: session, status } = useSession(); // ENTSPERREN FÜR DIE SESSION
    useEffect(() => {
    console.log('Session on login page:', session);
  }, []);

  
 

  if (status === "loading") {
    return <div>Loading....</div>
  }


  
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      console.log('Submitting login:', data);
      
      
      // kommuniziert mit der signIn (nicht register) function von next-auth
      const response = await signIn("credentials", {
        redirect: false,
          username: data.username,
          password: data.password,
      });

      console.log('Full Response:', response);

      if (response?.error === 'CredentialsSignin') {
        console.error('Login failed:', response.error);
        setLoginError('Invalid username or password. Please try again.');
      } else if (response?.error) {
        console.error('Login failed:', response.error);
        setLoginError('An unexpected error occurred during login.');
      } 
      else if (response?.ok) {
        console.log('Login successful:', response.ok);

        router.push("/") // ÄNDERN!!!!!!!!!!
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  

  

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> {/*css!!!!!!!!!!!!!! */}
      <h1 className="text-2xl md:text-4xl xl:text-5xl"> {/*css!!!!!!!!*/} Login</h1>
        <div className="relative">
          <div className="w-full relative">
            <Image src={seoul} alt="Parc in Southkorea" className="object-cover h-96"/>
          </div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            additionalClasses=""
          > {/*css!!!!!!!!!!!!!!! */}
            <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center">
                <div className="w-full md:w-96  p-6 bg-pWhite rounded-lg shadow-md mt-12">
                  <div className="text-xs md:text-sm xl:text-lg">
                    <FormInput
                      type= "text"
                      placeholder= "Username"
                      register={register("username", { 
                        required: "Username is required." 
                      })}
                      errors={errors.username}
                    />
                    {loginError && (
                      <p>Your username is incorrect</p>
                    )}
                     <br />
                    {/*{user !== null ? <h1>user here</h1> : <></>}*/}
                    <FormInput 
                      type="password"
                      placeholder="Password"
                      register={register("password", { 
                        required: "Password is required." 
                      })}
                      errors={errors.password}
                    />
                    {loginError && (
                      <p>Your password is incorrect</p>
                    )}
                     <br />
                    <div className="bg-pBrown text-pOrange w-1/3 text-center rounded-lg">
                      <FormButton type="submit" text= "Login" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <button
              onClick={() => router.push("/register")}
              className="mt-12 text-sm md:text-lg xl:text-2xl mb-40 font-bold"
            > {/*css!!!!!!! */}
              You don't have an account? Register here
            </button>
          </Form>
        </div>
    </MainPage>
  );
};

export default LoginPage;