import * as gbl from "@/globals";

export default async (limit: number = 200): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/all`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ limit }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
