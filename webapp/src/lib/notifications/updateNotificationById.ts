import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  _id: string;
  options: ApiParamOptions;
  update: Partial<NotificationData>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/by-id`, {
      method: "PATCH",
      headers: defaultInternalHeader,
      body: JSON.stringify({ _id, update, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
