import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

export type InvitationData = {
  toId: string;
  fromId: string;
  subject: string;
  type: NotificationType;
  messages: NotificationMessage[];
};
export default async (notificationId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/accept-contact-invitation`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ notificationId }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
