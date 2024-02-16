// Profile Page

"use client";

import FormButton from "@/components/forms/form-button";
import FormInput from "@/components/forms/form-input";
import MainPage from "@/components/pages/main-page";
import useFetchUser from "@/hooks/use-fetch-user";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import {  SubmitHandler, useForm } from "react-hook-form";


import seoul from './../../../../public/assets/user.jpg'
import user from './../../../../public/assets/userlogo.png'
import { signOut, useSession } from "next-auth/react";
import { deleteUser } from "@/components/cards/user/delete-user";
import FetchUser from "@/utils/fetch-user";
import Form from "@/components/forms/form";


type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
  // userimage_id: number;
  userimage_URL: string;
  is_admin: boolean;
};


{/*export async function getUser(id:string) : Promise<UserData> {
  const userResponse = await fetch(`http://127.0.0.1:8000/api/user/${id}`)
  console.log("Useeeeer:" , `http://127.0.0.1:8000/api/user/${id}`);
  return userResponse.json()
}*/}

type UserProps = {
  params: {
    id: string;
  };
};


type UpdateUserInputs = {
  // userimage_id: number; // kontrolle!!!!!!!!!!
  email: string;
  password: string;
  repeatPassword: string;
  userimage_URL: FileList;
};






const ProfilePage: FC<UserProps> = ({params}) => {
  const { data: session } = useSession();
  console.log("Userpage mit session eingeloggggt:", session);


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
  } = useForm<UpdateUserInputs>(
    {
    defaultValues: {
      // userimage_id: "",
      email: "",
      password: "",
      repeatPassword: "",
      userimage_URL: undefined,
    }
  });



  const [userData, setUserData] = useState<UserData | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [repeatPassword, setRepeatPassword] = useState("");

  {/*const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e: any) => setRepeatPassword(e.target.value);*/}

  const fetchUserData = async () => {
    try {

      if (session) {
        console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${params.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });
    
          if (response.ok) {
            const user = await response.json();
            setUserData(user);
            setValue("email", user.email);
            setValue("password", user.password);
            setValue("repeatPassword", user.repeatPassword);
            setValue("userimage_URL", user.userimage_URL);
          } else {
            console.error("Failed to fetch user data");
          }
      }
    } catch (error) {
      console.error("Error fetchning user data:", error);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, [params.id]);
  

  const updateUserProfile = async (data: UpdateUserInputs) => {
    try {
     if (session) {
  
        const formData = new FormData();

        if (data.email !== userData?.email) {
          formData.append("email", data.email);
        }
        if (data.password !== "") {
          formData.append("password", data.password);
        }
        if (data.repeatPassword !== "") {
          formData.append("repeatPassword", data.repeatPassword);
        }
        if (data.userimage_URL[0]) {
          formData.append("userimage_URL", data.userimage_URL[0]);
        }
        
      if (formData.has("email") || formData.has("password") || formData.has("repeatPassword") || formData.has("userimage_URL")) {
        console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${session?.access_token}`
          },
        }); // wieso kann nicht auf die route zugegriffen werden
        console.log("Respoooooonse:", response);
  
        
      if (response.status === 201) {
        console.log("User update successful:", response);
        setSuccessMessage("Data update successful");
      } else {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
    } else {
      console.log("No data to update.");
      setSuccessMessage("No data to update.");
    }
  }
  }
  catch (error) {
  
    console.error("Error updating useeer:", error);
    setErrorMessage("Error data updating");
  }};
 
  {/*const updateUserProfile = async (data: UpdateUserInputs) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(data),
      });
        
      if (response.ok) {
        console.log("User update successful:", response);
        setSuccessMessage("Data update successful");
      } else {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Error data updating");
    }
  };*/}


    const deleteUserProfile = async (id: string) => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {

        const userId = session.user.id

        

        if(!userId) {
          console.error("User not authenticated.");
          return;
        }
        // const userResponse = await fetch(`http://127.0.0.1:8000/api/user/${id}`)
        // console.log("Uuuuuuser:", userResponse);
        // const userData = await userResponse.json();

        {/*if(userData.user.id !== userId) {
          console.error("You are not the owner of this user.");
          return;
        }*/}
        console.log("baseurl:", process.env.NEXT_PUBLIC_BASE_URL)
        const deleteUserResponse = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          data: {
            id: params.id
          }
        });

        console.log("Delete RESPONSE:", deleteUserResponse)

        if (deleteUserResponse.status === 200) {
          console.log(`User mit ID ${id} erfolgreich gelöscht`);
          setSuccessMessage("Profile successful deleted");
          await signOut();
        } else {
          console.error(`Löschen des Users mit der ID ${id} fehlgeschlagen`);
          throw new Error(`Failed to delete user with ID ${id}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setErrorMessage("Error deleting profile");
      }
        
      } else {
        console.error("Error deleting user:");
      } 
    };


  

  // watch den Wert vom Passwort
  // so können wir das mit dem repeatPassword vergleichen
  // const password = watch("password");




   const onSubmit: SubmitHandler<UpdateUserInputs> = async (data) => {
    try {
      console.log("Update User Dataaaaa:", data);
      // response create
      // Kommunikation mit den vorherigen erstellten api route /src/app/api/auth/register    // kontrolle!!!!!!!!!!!!!!!!!!!!
      // const response = await axios.post("http://127.0.0.1:8000/api/user", data); // kontrolle!!!!!!!!!!!!
      await updateUserProfile(data);
      // console.log("Response User:", response);

      // check ob die response erfolgreich war
      // if (response.status === 200) {
        // console.log("Userupdate successful:", response)
        // weiterleiten zu profile page
        // router.push("/profile"); // kontrolle!!!!!!! ob weiterleiten und dann wie!!!!!!!!!!!!!! mit Router????!!!
       //  router.push("/");
     //  }
    } catch (error) {
      // wenn es einen error gibt
      console.error("Update User failed:", error);
    }
  };



    return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16"> 
      <h1 className="text-2xl md:text-4xl xl:text-5xl"> My Account</h1>
      {successMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-2xl md:text-4xl xl:text-5xl">{errorMessage}</div>
      )}
      {/*<h2 className="text-2xl md:text-4xl xl:text-5xl">{session?.user?.username}</h2>*/}

      {/* grid container */}
      {/*{userData && (
        <div className="">
          <FetchUser user={userData}/>
        </div>
      )}*/}

      <div className="relative">
        <div className="w-full relative">
          <Image src={seoul} alt="Parc in Southkorea" className="object-cover h-screen w-full"/>
        </div>


        {/*<input
          type="text"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

    <button onClick={updateUserProfile}>Update Profile</button>*/}


        <Form
          onSubmit={handleSubmit(onSubmit)} 
          additionalClasses=""
        >
          <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center">
              <div className="flex w-full p-6 bg-pWhite rounded-lg shadow-md">
                <div className="flex-grow">
                  <h2 className="text-sm md:text-lg xl:text-2xl">
                    Hello {session?.user?.username}!
                  </h2>
                </div>
                
                <div className="h-20 w-20 overflow-hidden flex-shrink-0">
                  {session && userData?.userimage_URL ? (
                  <>
                    <div className="">
                      <Image src={userData.userimage_URL} alt="Userprofile" width={100} height={100} layout="responsive" className="rounded-full object-cover"/>
                    </div>
                  </>
                  ) : (
                  <>
                  <div className="">
                    <Image src={user} alt="Userprofile" width={100} height={100} layout="responsive" className="rounded-full object-cover"/>
                  </div>
                  </>
                  )}



                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full p-6 bg-pWhite rounded-lg shadow-md mt-12">
                <div className="text-xs md:text-sm xl:text-lg">
                  {/*<FormInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)} // Funktion, um mit dem ausgewählten Bild umzugehen
                    register={register("userImage", {})}
                    errors={errors.userImage}
                  />*/}
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
                    defaultValue={watch("email", "")}
                    errors={errors.email}
                  /> <br />
                  <FormInput 
                    type= "password"
                    placeholder= "Password"
                    register={register("password", {
                      // required: "Password is required.", 
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
                      // required: "Please repeat your password.",
                      validate: (value) =>
                        value === watch ("password") || "The passwords do not match.",
                    })}
                    errors={errors.repeatPassword}
                  />
                  <FormInput additionalClasses="mt-5"
                  type="file"
                  placeholder="Choose an image"
                  register={register("userimage_URL")}
                  errors={errors.userimage_URL}
                  /> <br />
                  <div className="bg-pBrown text-pOrange w-20 text-center rounded-lg">
                    <FormButton type="submit" text="Update" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="text-sm md:text-lg xl:text-xl p-3 bg-pOrange text-pBrown w-40 sm:w-48 rounded-3xl text-center mt-10 mb-20">
          <button onClick={() => deleteUserProfile(params.id)}>Delete Profile</button>
        </div>
      </div>
    </MainPage>
  ) 
};

export default ProfilePage;


