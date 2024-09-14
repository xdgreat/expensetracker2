// pages/api/loginAuth.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const envUsername = process.env.APPUSERNAME;
  const envPassword = process.env.APPPASSWORD;

  console.log(username, envUsername, password, envPassword);

  if (username === envUsername && password === envPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    });
  }
}
