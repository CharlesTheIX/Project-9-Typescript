import * as gbl from '@/globals';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { clerkId } = await request.json();
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${process.env.EXTERNAL_API_VERSION}/users/by-clerk-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXTERNAL_API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ clerkId }),
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}.`);
    return NextResponse.json(gbl.response_SERVER_ERROR);
  }
}