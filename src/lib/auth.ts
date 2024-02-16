// Authentication

// import { CustomSession } from "@/types/custom-types";
import { CustomSession } from "@/types/custom-types";
import { ISODateString } from "next-auth";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Erweiterung des default user type von NextAuth
// Möglichkeit dem User type ein JWT-Feld hinzuzufügen

interface ExtendedUser {
  id: string ;
  username: string;
  email: string;
  is_admin: boolean;
  jwt: string; // Optionales JWT-Feld zum Speichern des JSON-Web-Tokens
}

let authenticatedUser: ExtendedUser | null = null;

{/*const session: CustomSession = {
  user: {
    id: '',
    name: '',
    email: '',
    is_admin: '',
  },
  access_token: '',
  expires: '',
}*/}

// Konfiguration der Authentication Optionen für NextAuth
export const authOptions: NextAuthOptions = {
  // 1. Definition der Liste der authentication providers
  providers: [
    // Konfigurierung des CredentialsProvider für Username und Passwort
    // Authentifizierung
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Authentication wird gerufen wenn der user sich anmelden möchte
      async authorize(credentials) : Promise<ExtendedUser | null> {
        try {
        // POST request an DB API senden um den user zu authentifizieren
        const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, { // anpassen!!!!!
          // HTTP Methode definieren: header und body
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
       
        const user = await response.json();
        console.log('User dataaaaaaaaaaaaa:', user);
        // wenn response erfolgreich
        // return die user data including dem JWT token
        if(response.ok && user) {  
          authenticatedUser = {        
            id: user.user.id,
            username: user.user.username,
            email: user.user.email,
            is_admin: user.user.is_admin,
            jwt: user.access_token,
          };
          return authenticatedUser;
        } else {
          console.error('Authentication failed. Status:', response.status);
          //console.log(response)
          // wenn authifizierung fehlschlägt, return null
          return null;
        }
        } catch (error) {
        console.error('An error occured during authentication:', error);
        return null;
      }
    }}),
  ],

  
  // callback function definieren um das Authentifizierungsverhalten anzupassen
  callbacks: {
    // JWT Callback wird gerufen, wann ein JWT kreiert oder updatet wurde
    // async jwt({ token, user }: {token: JWT; user?: ExtendedUser | null }) {
      // wenn es ein user object hat (während dem laden),
      // wird der JWT zum token hinzugefügt
     //  if (user) {
      //   token.access_token = user.jwt;
     //  }
      // return den updatted token
     //  return token;
   //  },
    // session callback wird gerufen, wann die session data abgerufen wird
// session callback wird gerufen, wann die session data abgerufen wird
async session({ session, token }: { session: CustomSession; token: JWT & { user?: ExtendedUser } }) {
  console.log("Sessssssssssssssssion:", session);

  // Überprüfe, ob die ID und access_token im user-Objekt vorhanden sind
  if (authenticatedUser && authenticatedUser.id) {
    console.log("Authenticated User Data-aha:", authenticatedUser);
    session.user = {
      id: authenticatedUser.id,
      username: authenticatedUser.username,
      email: authenticatedUser.email,
      is_admin: authenticatedUser.is_admin
    };
      session.access_token = authenticatedUser.jwt;
    }
    return session;
    }
      
  },
};

 export default authOptions;


 {/*}
{
  expires: '';
  user: {
    id: '',
    name: '',
    email: '',
    is_admin: '',
  };
  access_token: ''
}*/}