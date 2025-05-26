import * as gbl from "@/globals";

export default async (clerkId: string): Promise<ApiResponse> => {
  console.log(clerkId);
  try {
    const response: ApiResponse = await fetch(`/api/users/by-clerk-id`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ clerkId }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
