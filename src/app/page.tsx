// MainPage + Tips Seite

"use client"

// import TipPostCard from "@/components/cards/tip/tip-post-card";
import MainPage from "@/components/pages/main-page";
import Image from "next/image";
import { FC } from "react";

import seoul from './../../public/assets/hero.jpg'
import tip from './../../public/assets/user.jpg'
import tip_1 from './../assets/tip_1.jpg'
import tip_2 from './../assets/tip_5.jpg'
import tip_3 from './../assets/tip_2.jpg'
import tip_4 from './../assets/tip_4.jpg'
import tip_5 from './../assets/tip_6.jpg'
import FetchAllTips from "@/utils/fetch-all-tips";
import Link from "next/link";
import FormButton from "@/components/forms/form-button";
import { useSession } from "next-auth/react";





// Async Componente, die die Funktion von fetch-all-tips aufrufen kann.
const Tips: FC = () => {

  const {data: session, status } = useSession();
  console.log("User Frontpage eingeloggt:", session);
  

  {/*const {data: session, status } = useSession();
  useEffect(() => {
    console.log("User von der Frontpage:", session);
  }, [])*/}
  

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16 mb-12">
     <div className="w-full relative flex justify-center flex-col-reverse items-center">
       <h1 className="w-2/3 text-4xl sm:text-3xl md:text-4xl text-pBrown mb-64 sm:mb-52 lg:mb-60 absolute text-center">HangukJingu</h1>
       
       <p className="w-2/3 text-2xl sm:text-lg md:text-xl xl:text-2xl xxl:text-3xl text-pWhite absolute mt-20 sm:mt-32 md:mt-20 xl:mt-32 text-center">
        Find useful tips and tricks for your stay in Seoul
       </p> {/*font-xl text-white */}
      <Image src={seoul} alt="Seoul City" className="object-cover h-96 sm:h-80 w-full"/>{/*fill anstatt width 800 und height 400 */}
     </div>
    
    
      {/*<p >{session ? "Annyeong" : "Find your tip"}</p>*/}
      

      <div className="">
        <FetchAllTips />
      </div>
    
    

    <div className="mt-6 text-xl">
        <h2 className="font-bold">Questions or Inputs?</h2> 
        <p>If you have any questions or you couldn't find what you need to know, please contact me
          <Link href="/about_me" className="ml-2 underline">here</Link>
        </p>
    </div>


      









            {/*Nur für ADMIN!!!!!*/}
            {session && session.user.is_admin ? (
            <>
              <div className="mt-10">
                <Link href="/create_tip">
                  <div className="text-md sm:text-xl p-3 bg-pOrange w-40 sm:w-48 rounded-3xl text-center">Create new tip</div>
                </Link>
              </div>
            </>
            ) : (
            <>
            </>
            )}




    </MainPage>
  );
};

export default Tips;