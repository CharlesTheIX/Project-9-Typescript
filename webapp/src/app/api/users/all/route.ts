import * as gbl from "@/globals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { params } = await request.json();
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/users/all${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}
