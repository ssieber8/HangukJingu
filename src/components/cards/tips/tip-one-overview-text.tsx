// Bezeichnung vom Tip

import { FC } from "react";

type TipOverviewTextProps = {
  additionalClasses?: string;
  // tip_name: string;
  tip_text?: string;
  className?: string;
};

const TipOneOverviewText: FC<TipOverviewTextProps> = ({
  additionalClasses,
  // tip_name,
  tip_text,
  className,
}) => {
  return (
    <div className=""> {/*css!!!!!!!!!!!!!!!!! */}
      {/*<h1 className="">{tip_name}</h1>*/}
      <div
      className="w-11/12" 
      dangerouslySetInnerHTML={{
        __html: tip_text ? tip_text: "",
      }}
      /> 
    </div> 
  );
};

export default TipOneOverviewText