// About me Page

import MainPage from "@/components/pages/main-page";
import Image from "next/image";

import seoul from './../../../public/assets/about_me.jpg'

export default function About() {
  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16">
      <h1 className="text-2xl md:text-4xl xl:text-5xl">About me</h1>
      <Image src={seoul} alt="Hangang River" className="object-cover h-96 w-full"/>
      <div className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl text-pBrown mt-5">
        <p className="">
        I lived in Seoul for two years, and I've learned a lot about navigating this vibrant city. 
        From understanding the transportation system to uncovering local favorites, there are little things that can make a big difference when you're settling in. 
        If you're planning a move to Seoul or are simply curious about life here, I'd love to share the practical tips and insights I've gained.
        </p> <br />
        <p>My goal is to help you have a smoother experience, whether it's finding your way around, 
        making the most of your budget, or just feeling a bit more comfortable in a new environment.
        </p>
      </div>
      <div className="mt-12 mb-12">
        <h2 className="text-xl md:text-2xl xl:text-4xl mb-8 md:mb-10 xl:mb-12">Impressum</h2>
          <div className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl mb-8 md:mb-10 xl:mb-12">
            <p>HangukJingu</p>
            <p>Musterstrasse 100</p>
            <p>1000 Musterplace</p>
            <p>Wonderland</p>
            <p>hangukjingu@gmail.com</p>
          </div>
          <div className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl mb-4 md:mb-8 xl:mb-12">
            <p>
              Font used: Google Font Next Raleway
            </p>
          </div>
      </div>
    </MainPage>
  );
};