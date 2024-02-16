// Register / Login Form

"use client";

import { FC, FormEvent, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
  additionalClasses?: string;
};

const Form: FC<FormProps> = ({ children, onSubmit, additionalClasses}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={"${additionalClasses}"} 
      > {/*css!!!!!!!!!!!! */}
        {children}
      </form>
  );
};

export default Form;