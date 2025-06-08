import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  _id: string;
  update: Partial<NotificationData>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update } = props;

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/by-id`, {
      method: "PATCH",
      headers: defaultInternalHeader,
      body: JSON.stringify({ _id, update }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
