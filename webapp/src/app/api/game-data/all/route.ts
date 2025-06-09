import { response_SERVER_ERROR } from "@/globals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { params } = await request.json();
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/game-data/all${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get all game data error: ${error.message}.`);
    return NextResponse.json(response_SERVER_ERROR);
  }
}
