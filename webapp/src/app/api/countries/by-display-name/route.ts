import * as gbl from '@/globals';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { displayName } = await request.json();
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${process.env.EXTERNAL_API_VERSION}/countries/by-display-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXTERNAL_API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ displayName }),
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get countries by displayName error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}