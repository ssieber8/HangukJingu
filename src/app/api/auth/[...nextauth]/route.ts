// Route von NextAuth-Handler

// Erstellung des NextAuth-Handler mit den angegebenen Authentifizierungsoptionen.
// Die Funktion NextAuth nimmt ein Konfigurationsobjekt als Argument
// und gibt Handlerfunktionen für HTTP GET- und POST-Anfragen zurück.

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

// Exportieren der Handlerfunktionen für HTTP GET und POST Anfragen.
// In Next.js-API-Routen können Funktionen zur Behandlung bestimmter HTTP-Methoden definiert werden.
// Hier werden sowohl GET- als auch POST-Anfragen durch den NextAuth-Handler behandelt.
// Dies ist notwendig, da der Authentifizierungsfluss sowohl das Abrufen von Daten (GET)
// als auch die Übermittlung von Daten (POST) umfasst.

export { handler as GET, handler as POST };