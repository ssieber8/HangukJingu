// Bild vom User

import { FC } from "react";

type UserImageProps = {
  additionalClasses?: string;
  imageUrl: string;
  alt: string;
  className?: string;
};

const UserImage: FC<UserImageProps> = ({
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
      <img src={imageUrl} alt={alt} style={{ objectFit: "cover" }} />
      {/*<Image src={imageUrl} fill style={{ objectFit: "cover" }} alt= {alt} />*/}
    </div>
  );
};

export default UserImage;