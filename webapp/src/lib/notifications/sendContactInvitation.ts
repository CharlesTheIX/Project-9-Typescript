import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

export type InvitationData = {
  toId: string;
  fromId: string;
  subject: string;
  type: NotificationType;
  messages: NotificationMessage[];
};
export default async (invitationData: InvitationData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/send-contact-invitation`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ invitationData }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
