// Bild vom Tip

import { FC } from "react";

type HangukImageProps = {
  additionalClasses?: string;
  imageUrl: string;
  alt: string;
  className?: string;
};

const HangukOneImage: FC<HangukImageProps> = ({
  additionalClasses,
  imageUrl,
  alt,
  className,
}) => {
  // Direkte Umwandlung der ID in die Bild_URL
  // const imageUrl = `${process.env.NEXTAUTH_URL}/api/tipimage/${id}` // Andere URL?????
  return (
    <div className={`relative ${additionalClasses}`}> 
      {/*Bild*/}
      <img src={imageUrl} alt={alt} className="rounded-md object-cover h-60 w-full" />
      {/*<Image src={imageUrl} fill style={{ objectFit: "cover" }} alt= {alt} />*/}
    </div>
  );
};

export default HangukOneImage;