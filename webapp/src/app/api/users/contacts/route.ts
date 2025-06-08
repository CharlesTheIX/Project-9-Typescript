import * as gbl from "@/globals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { _id } = await request.json();
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/users/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ _id }),
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get user by _id error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}
