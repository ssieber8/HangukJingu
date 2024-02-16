// Forminput für Register und Login

"use client";

import { FC, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

type FromInputProps = {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  errors?: FieldError | undefined;
  additionalClasses?: string;
  defaultValue?: string
};

const FormInput: FC<FromInputProps> = ({
  type,
  placeholder, 
  register,
  errors,
  additionalClasses,
  defaultValue
}) => {
  const [revealPassword, setRevealPassword] = useState(false);

  return (
    <div className=""> {/*css!!!!!!!!!!!!!! */}
      <div 
        className={`${additionalClasses}`}
      >{/*css!!!!!!!!!!!!!!! */}
        <input {...register}
          type={revealPassword ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="" 
        /> {/*css!!!!!!!!!!!!!!! */}
        {type === "password" &&
          (revealPassword ? (
            <RiEyeOffLine
              size={22} // anpassen
              onClick={() => setRevealPassword(!revealPassword)}
              className="cursor-pointer"
            />
          ) : (
            <RiEyeLine
              size={22} // anpassen
              onClick={() =>setRevealPassword(!revealPassword)}
              className="cursor-pointer"
            />
          ))}
      </div>
      {errors && (
        <span className=""> {/*css!!!!!!!!!!!*/}  {errors.message}</span>
      )}
    </div>
  );
};

export default FormInput;