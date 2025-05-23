import * as gbl from "@/globals";

export default async (email: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/users/by-email`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ email }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
