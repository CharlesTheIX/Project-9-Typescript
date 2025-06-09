import getApiParams from "../getApiParams";
import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

type Props = {
  _id: string;
  options: ApiParamOptions;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, options } = props;
  const params = getApiParams(options);

  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries/by-id`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ _id, params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
