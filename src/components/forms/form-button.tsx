// Button zum Registrieren / Einloggen

import { ButtonHTMLAttributes, FC } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const FormButton: FC<FormButtonProps> = ({ text, ...props }) => {
  return (
    <button
    {...props}
    className=""
    > {/*css!!!!!!!!!!!!!!!!!!! */}
      {text}
    </button>
  );
};

export default FormButton;