import * as gbl from '@/globals';
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${process.env.EXTERNAL_API_VERSION}/users/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXTERNAL_API_AUTH_TOKEN}`,
      }
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}