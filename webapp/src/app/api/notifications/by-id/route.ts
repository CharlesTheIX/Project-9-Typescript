import { response_SERVER_ERROR } from "@/globals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { _id, params } = await request.json();
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/notifications/by-id${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ _id }),
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Get notification by _id error: ${error.message}.`);
    return NextResponse.json(response_SERVER_ERROR);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { _id, update, params } = await request.json();
    const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/notifications/by-id${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ _id, update }),
    }).then((res: any) => res.json());
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Update notification by _id error: ${error.message}.`);
    return NextResponse.json(response_SERVER_ERROR);
  }
}

// export async function DELETE(request: NextRequest) {
//   try {
//     const { _id } = await request.json();
//     const response = await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/notifications/by-id`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
//       },
//       body: JSON.stringify({ _id }),
//     }).then((res: any) => res.json());
//     return NextResponse.json(response);
//   } catch (error: any) {
//     console.error(`Delete notification by _id error: ${error.message}.`);
//     return NextResponse.json(response_SERVER_ERROR);
//   }
// }
