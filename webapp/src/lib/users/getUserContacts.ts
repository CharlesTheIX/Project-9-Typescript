import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/contacts`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ _id }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
