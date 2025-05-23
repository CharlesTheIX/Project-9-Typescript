import * as gbl from "@/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${process.env.API_AUTH_TOKEN},`,
      },
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Health error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}
