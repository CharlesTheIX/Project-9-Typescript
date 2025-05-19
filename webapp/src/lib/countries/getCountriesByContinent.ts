import * as gbl from '@/globals';

export default async (continent: Continent): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch('/api/countries/by-continent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: `Bearer ${process.env.API_INTERNAL_AUTH_TOKEN},`,
      },
      body: JSON.stringify({ continent }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
