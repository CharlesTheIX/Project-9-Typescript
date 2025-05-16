import * as gbl from '@/globals';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${process.env.EXTERNAL_API_VERSION}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Health error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}