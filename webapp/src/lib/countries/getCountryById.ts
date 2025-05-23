import * as gbl from "@/globals";

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`${process.env.LOCAL_URI}/api/countries/by-id`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ _id }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
