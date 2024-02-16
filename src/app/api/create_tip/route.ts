// Route zum Create Tip

import axios from "axios";
import { NextResponse } from "next/server";

// Definition vom type für den request body
type Data = {
  tip_name: string;
  tip_text: string;
  user_id: number;
  tipimage_URL: string;
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
  if (!data.tip_name || !data.tip_text || !data.tipimage_URL) {
    return NextResponse.json(
      { message: "Tipname, Tiptext and Image are required" },
      { status: 400 }
    );
  }

  // request to API
  try {
    const dbResponse = await axios.post(
      // endpoint von der DB API für den tip krieren
      `${process.env.BASE_URL}/api/tips`, // kontrollieren!!!!!!¨
      // body vom request
      { tip_name: data.tip_name, tip_text: data.tip_text, user_id: data.user_id, tipimage_URL: data.tipimage_URL }
    );

    // response von der DB API
    return NextResponse.json({ user: dbResponse.data }, { status: 200 });
  } catch (error: any) {
    // console.log ("im here");
    // return error
    return NextResponse.json(
      {
        error: error.response || "Failed to create a tip",
      },
      { status: error.response?.status || 500 }
    );
  }
}
