// MainPage Componente mit verschiedenen children

import { FC, ReactNode } from "react";

type MainPageProps = {
  children: ReactNode;
  additionalClasses?: string;
}

const MainPage: FC<MainPageProps> = ({children, additionalClasses}) => {
  return (
    <main
      className={`${additionalClasses}`} // noch css!!!!!!!!!!!!!
    >
      {children}

    </main>
  );
};

export default MainPage;