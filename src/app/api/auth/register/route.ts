// Route zum Registrieren

import axios from "axios";
import { NextResponse } from "next/server";

// Definition vom type für den request body
type Data = {
  username: string;
  email: string;
  password: string;
};

// In Next.js 13, der Name der Function muss HTTP Method sein
// anstonsten funktionierts nicht
export async function POST(req: Request) {
  // nur POST requests erlauben
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed"},
      { status: 405}
    );
  }

  // erhalte data von dem request body
  const data: Data = await req.json();

  // check ob data valid ist
  if (!data.username || !data.email || !data.password) {
    return NextResponse.json(
      { message: "Username, email and password are required" },
      { status: 400 }
    );
  }

  // request to API
  try {
    const dbResponse = await axios.post(
      // endpoint von der DB API für das registrieren
      `${process.env.BASE_URL}/api/auth/register`, // kontrollieren!!!!!!¨
      // body vom request
      { username: data.username, email: data.email, password: data.password }
    );

    // response von der DB API
    return NextResponse.json({ user: dbResponse.data }, { status: 200 });
  } catch (error: any) {
    // console.log ("im here");
    // return error
    return NextResponse.json(
      {
        error: error.response || "Registration failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
