import { defaultInternalHeader, response_SERVER_ERROR } from "@/globals";

export default async (gameData: GameData): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game-data/create`, {
      method: "POST",
      headers: defaultInternalHeader,
      body: JSON.stringify({ gameData }),
    }).then((res: any) => res.json());
    return response;
  } catch (error: any) {
    return response_SERVER_ERROR;
  }
};
