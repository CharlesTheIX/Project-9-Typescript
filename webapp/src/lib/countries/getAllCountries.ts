import * as gbl from "@/globals";
import getApiParams from "../getApiParams";

export default async (options: ApiParamOptions): Promise<ApiResponse> => {
  try {
    const params = getApiParams(options);
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries/all`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ params }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
