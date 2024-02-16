// Tips

import HangukImage from "@/components/common/hanguk-image";
import CardSlugClientWrapper from "@/components/common/tip-client-wrapper";
import { CardTextType } from "@/types/enum";
import { FC } from "react";
import TipOverviewText from "./tip-overview-text";
import HangukOneImage from "@/components/common/hanguk-one-image";
import TipOneOverviewText from "./tip-one-overview-text";
// import DeleteTip from "@/utils/delete-tip";
// import DeleteOneTip from "./delete-one-tip";

type TipPostCardProps = {
  slug: string;
  id?: number;
  tip_name: string;
  tip_image_url: string;
  // tip_image: string | undefined;
  tip_text?: string;
  // tip: TipsData;
  // comment_text?: string;
};

const TipOnePostCard: FC<TipPostCardProps> = ({
  // tip
  slug,
  id,
  tip_name,
  tip_image_url,
  // tip_image,
  tip_text,
}) => {

  // console.log("TipPostCard Props:", tip_name, tip_text);

  return (
    <div className="mb-10 md:mb-14 xl:mb-20">
      <div
      className="" // css + style !!!!!!!!!!!!!!
    >
      <CardSlugClientWrapper
        slug={slug}
        // cardTextType={CardTextType.TIPS}
  >
      <div className="">
        <HangukOneImage
          className=""
          additionalClasses="" // css !!!!!!!!!!!
          imageUrl={tip_image_url}
          alt={`Tip post image for ${tip_name}`}
        />
        <div className=" w-fill text-sm md:text-lg xl:text-2xl mt-10">
          <TipOneOverviewText 
            // tip_name={tip_name} 
            tip_text={tip_text}
            additionalClasses=""
          />
        </div>
      </div>
      </CardSlugClientWrapper>
    </div>
    
    </div>
    
  );
};

export default TipOnePostCard;