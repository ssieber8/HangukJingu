// User Fetch

import { UserData } from "@/types/user";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Definition der Struktur der error response, welche von der API erwartet wird.
// Dies hilft TypeScript zu verstehen, um welcher Art von error object es isch handelt.

interface IErrorResponse {
  message: string; // eine userfreundliche errormessage
  status: number; // der HTTP status code vom error
}

// Definition der useFetchUser hook, der generische Typen verwendet, um die Struktur der zurückgegebenen Daten zu erzwingen.
const useFetchUser = (): {
  userData: UserData | null; // user data state, am anfang null
  isLoading: boolean; // ein boolean zum nachvollziehen ob etwas geladen wird
  error: IErrorResponse | null; // error state, am anfang null 
} => {
  // useSession hook zur jetzigen session und authorität zu erhalten
  const { data: session } = useSession();
  // Status für die Speicherung der user data.
  const [userData, setUserData] = useState<UserData | null>(null);
  // status für die Speicherung des Loading status.
  const [isLoading, setIsLoading] = useState(false);
  // Status für die Speicherung von jeglichen errors die auftretten können.
  const [error, setError] = useState<IErrorResponse | null>(null);

  // useEffect hook zur Durchführung von side effects im den components
  // Die user data werden abrufen, wenn die components aktiviert werden oder wenn sich die session ändert.
  useEffect(() => {
    // asyncron function zum user data fetch
    const fetchUser = async () => {
    // access_token von der Session extrahieren
    const token = session?.access_token;
    // wenn ein token existiert, mit data fetching weitermachen

    if (token) {
      // es wird geladen
      setIsLoading(true);
      try {
        // GET-Anfrage an den Server stellen, um die user data zu erhalten.
        // Authorization header verwenden, um den access token bereitzustellen.
        const response = await axios.get<UserData>("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`, // kontrolle!!!!!!!!!!!!!!!!!!!!!!!!
          },
        });
        // wenn der request erfolgreich ist, speichern der user data.
        setUserData(response.data);
      } catch (error) {
        // Bei error, check ob es ein AxiosError mit einem response object ist.
        if (axios.isAxiosError(error) && error.response) {
          // wenn es einer ist, Verwendung von error details.
          setError({
            message:
              error.response.data.message || "An unknown error occurred",
            status: error.response.status,
          });
        } else {
          // wenn es keinen AxiosError mit einer response ist, generierte Fehlermeldung geben.
          setError({
            message: "An unknown error occurred",
            status: 500, // default error status code brauchen.
          });
        }
      } finally {
        // wenn der request komplett ist, erfolgreich oder nicht, Anzeige dass loading fertig ist.
        setIsLoading(false);
      }
    }
  };

  // Aufrufen von der oben definierte Funktion fetchUser.
  fetchUser();
}, [session?.access_token]); // Die Wirkung hängt vom access_token ab, d.h. sie wird erneut ausgeführt, wenn sich der Token ändert.

// Rückgabe der user data, loading status und eventueller Fehler des hooks.
// Dadurch können compontes, die diesen hook verwenden, auf die user data zugreifen und wissen, wann sie geladen werden oder ob ein Fehler aufgetreten ist.
return { userData, isLoading, error };
};

// hook exportieren, damit er in anderen components verwendet werden kann.
export default useFetchUser;