// Footer 

import Link from "next/link";
import { FC } from "react";

const Footer: FC = async () => {
  return (
    <footer className="bg-pBrown">
      <div className="pb-2 md:pb-4 xl:pb-6 pt-2 md:pt-4 xl:pt-6 text-xs md:text-sm xl:text-lg text-center"> {/*css!!!!!!!!!!!!!!! */}
        <p className="text-pWhite">
          Webpage Design @ 2024 by HangukJingu
        </p> <br />
        <Link href="/about_me">
          <div className="text-pWhite">
            Impressum
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;