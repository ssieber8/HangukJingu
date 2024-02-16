// Ein Tip von der Frontpage holen

import MainPage from "@/components/pages/main-page";
import { FC } from "react";

import TipPostCard from "@/components/cards/tips/tip-post-card";
import dataOneFetch from "@/utils/data-one-fetch";
import TipOnePostCard from "@/components/cards/tips/tip-one-post-card";

type TipData = {
  id: string;
  tip_name: string;
  tip_text: string;
  user_id: string;
  tipimage_id: number;
  tipimage_URL: string;
};

type TipImageData = {
  id: string;
  file: string;
  tip_id: number;
}

type FetchOneTipProps = {
  tip: TipData
}



// Async Componente, die die Funktion von fetch-all-tips aufrufen kann.
const FetchOneTip: FC<FetchOneTipProps> = ({tip}) => {

  // console.log("datatip:", datatip);

  return (
    <MainPage additionalClasses="">    
    {/* grid container */}
     <div className=""> {/*css !!!!!!!!!!!! */}

            <div>
              <TipOnePostCard 
                key={tip.id} 
                tip_name={tip.tip_name} 
                tip_text={tip.tip_text}
                // id={tip.tipimage_id} 
                slug={tip.id.toString()}
                tip_image_url={tip.tipimage_URL}
              />
            </div>

      </div>
    </MainPage>
  );
};

export default FetchOneTip;