// Route für den user

import axios from "axios";

// Definition der GET-Funktion, die GET-Anfragen bearbeiten wird
export async function GET(req: Request) {
  // Check ob die request method GET ist
  if (req.method !== "GET") {
    // wenn nicht, return eine 405 Method Not Allowed response
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Abrufen der 'Authorization' header von der eingehenden Anfrage
  const authorizationHeader = req.headers.get("Authorization");
  // token von der 'Authorization' header (format: Bearer <token>) extrahieren
  const token = authorizationHeader?.split(" ")[1];

  // Check ob der token nicht vohanden ist
  if (!token) {
    // wenn nicht, return eine 401 Unauthorized response
    return new Response(JSON.stringify({ message: "Token not provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // request zur DB 
  try {
    // Get request zur DB und fetch die user informationen
    // "Authorization" header mit dem Bearer token in der request
    const dbResponse = await axios.get(
      `${process.env.BASE_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return die user informationen mit einer 200 ok response
    return new Response(JSON.stringify({ user: dbResponse.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Log der error fürs debugging
    // console.error("Error fetching user information:", error);
    // Retrun eine error response mit einem status code von der errormessage oder 500 Server Error
    // Die Errormeldung ist in der response auch einbezogen
    return new Response(
      JSON.stringify({
        error:
          error.response?.data?.message || "Failed to get user information",
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "applicatin/json" },
      }
    );
  }
}