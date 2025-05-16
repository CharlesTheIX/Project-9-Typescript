import * as gbl from '@/globals';

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch("/api/countries/by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};