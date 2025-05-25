import * as gbl from "@/globals";

export default async (displayName: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/countries/by-display-name`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ displayName }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
