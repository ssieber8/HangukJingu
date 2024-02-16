// Bezeichnung vom User

import { FC } from "react";

type UserOverviewTextProps = {
  additionalClasses?: string;
  username: string;
  className?: string;
};

const UserOverviewText: FC<UserOverviewTextProps> = ({
  additionalClasses,
  username,
  className,
}) => {
  return (
    <div className=""> {/*css!!!!!!!!!!!!!!!!! */}
      <h1 className="">{username}</h1> {/*css!!!!!!!!!!!!!!!*/}
    </div> 
  );
};

export default UserOverviewText