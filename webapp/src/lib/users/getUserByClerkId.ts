import * as gbl from '@/globals';

export default async (clerkId: string): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch('/api/users/by-clerk-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: `Bearer ${process.env.API_INTERNAL_AUTH_TOKEN},`,
      },
      body: JSON.stringify({ clerkId }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
