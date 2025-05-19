import * as gbl from '@/globals';

export default async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`/api/users/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: `Bearer ${process.env.API_INTERNAL_AUTH_TOKEN},`,
      },
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
