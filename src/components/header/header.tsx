// Header mit Navigation

"use client"

import { CustomSession } from "@/types/custom-types";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

// Datafetch einfügen

const Header: FC = () => {
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutAndCloseMenu = async () => {
    await signOut({ redirect: false });
    setIsMenuOpen(false); // Schließt das Menü
  };

  
  {/*const {data: session, status } = useSession();
  useEffect(() => {
    console.log("User vom header:", session);
    
  }, []);*/}
  
  const router = useRouter();

  const { data: session, status } = useSession();
  console.log("User header eingeloggt:", session);

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.push("/login");
  }

  {/*const navigation = () => {
    useEffect(() => {
      const button = document.getElementById('menuButton');
      button?.addEventListener('click', () => {
        document.getElementById('menuContainer'.classList.toggle('hidden'))
      });
      return () => button?.removeEventListener ('click', () => {});
    })
  }*/}




  {/*<script> 
        document.getElementById('menuButton').addEventListener('click', () => {
            document.getElementById('menuContainer').classList.toggle('hidden'); 
        });
      </script>*/}




  return (
    <header className="relative mt mb-12 md:mb-16 xl:mb-24"> {/*css!!!!!!!!!! */}
      <div className="mb-5 md:mb-40 relative"> {/*css!!!!!!!!!! */}

      <button id="menuButton" className="mt-48 md:mt-14 ml-16" onClick={handleMenuToggle}> 
        <Image src="/assets/burger.png" alt="Burgermenu" width="60" height="60" className="" /> 
      </button>
       
       
        {/*Navigation */} {/*WIE NAVIGATION!!!!!!!!!!!!!! */}
        <nav id="menuContainer" className={`absolute left-16 top-32 md:top-14 bg-pBrown text-pWhite rounded text-xl md:text-2xl p-6 md:p-7 xl:p-8 ml-8 md:ml-12 xl:ml-16 w-40 md:w-52 xl:w-64 ${isMenuOpen ? '' : 'hidden'}`}> {/*angepasst!!!!md:w-52 war auf 60 */}
          <ul className="flex-col"> {/*css!!!!!!!!!! */}
            <li><Link href='/about_me' className="hover:text-pOrange" onClick={closeMenu}>About me</Link></li>
            {/*<li><Link href='/register' className="hover:text-pOrange">Register</Link></li>
            <li><Link href='/login' className="hover:text-pOrange">Login</Link></li>*/}
            {session ? (
            <>
              <li><Link href={`/user/${session.user?.id}`} className="hover:text-pOrange" onClick={closeMenu}>Profile</Link></li>
              <li><Link onClick={handleLogoutAndCloseMenu} href="/" className="hover:text-pOrange">Logout</Link></li>
            </>
            ) : (
            <>
              <li><Link href='/register' className="hover:text-pOrange" onClick={closeMenu}>Register</Link></li>
              <li><Link href='/login' className="hover:text-pOrange" onClick={closeMenu}>Login</Link></li>
            </>
            )}
            
            
          </ul>
        </nav>
        <Link href='/'>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2"> {/*css!!!!!!!!!! */}
            <Image src="/assets/logo_black.png" alt="HangukJingu Logo" width="400" height="200"/>
          </div>
        </Link>
       </div>
       {/*<script> 
        document.addEventListener('DOMContentLoaded', function() {
          const button = document.getElementById('menuButton');
          const menuContainer = document.getElementById('menuContainer');

          button.addEventListener('click', () => {
            menuContainer.classList.toggle('hidden'); 
          });
        });
      </script>*/}
    </header>
  );
};

export default Header;


