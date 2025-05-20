import * as gbl from "@/globals";

export default async (displayName: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/countries/by-display-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${process.env.LOCAL_API_AUTH_TOKEN},`
      },
      body: JSON.stringify({ displayName })
    }).then((res: any) => res.json());

    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
