import * as gbl from "@/globals";

export default async (limit: number = 200): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/countries/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${process.env.NEXT_PUBLIC_LOCAL_API_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ limit }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
