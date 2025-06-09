import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  displayName: string;
  options: ApiParamOptions;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { displayName, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries/by-display-name`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ displayName, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
