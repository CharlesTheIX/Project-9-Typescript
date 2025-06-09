import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  email: string;
  options: ApiParamOptions;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { email, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/by-email`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ email, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
