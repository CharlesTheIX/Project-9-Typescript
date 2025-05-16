import * as gbl from '@/globals';

export default async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/countries/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};