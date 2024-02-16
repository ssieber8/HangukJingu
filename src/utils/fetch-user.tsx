// User holen

import MainPage from "@/components/pages/main-page";
import { FC } from "react";

import dataOneFetch from "@/utils/data-one-fetch";
import UserPostCard from "@/components/cards/user/user-post-card";

type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
  userimage_id: number;
  userimage_URL: string;
  is_admin: boolean;
};

type FetchUserProps = {
  user: UserData
}



// Async Componente, die die Funktion von fetch-all-tips aufrufen kann.
const FetchUser: FC<FetchUserProps> = ({user}) => {

  // console.log("datatip:", datatip);

  return (
    <MainPage additionalClasses="ml-8 md:ml-12 xl:ml-16 mr-8 md:mr-12 xl:mr-16 mb-12">    
    {/* grid container */}
     <div className=""> {/*css !!!!!!!!!!!! */}

            <div>
              <UserPostCard 
                key={user.id} 
                username={user.username} 
                slug={user.id.toString()}
                user_image_url={user.userimage_URL}
              />
            </div>

      </div>
    </MainPage>
  );
};

export default FetchUser;