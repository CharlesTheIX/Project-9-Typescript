import * as gbl from "@/globals";

export default async (requestData: NotificationData): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/create`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ requestData }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
