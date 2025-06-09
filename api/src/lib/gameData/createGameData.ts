import Model from "../../models/gameData.model";
import { response_BAD, response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

export default async (props: GameData): Promise<ApiResponse> => {
  const { gameType, userId, score } = props;

  try {
    const newDoc = new Model({
      gameType,
      userId,
      score,
    });
    if (!newDoc) return { ...response_BAD, message: "Game data not created." };

    const createdDoc = await newDoc.save();
    if (!createdDoc) return { ...response_BAD, message: "Game data not created." };

    return { ...response_DB_UPDATED, data: createdDoc };
  } catch (error: any) {
    console.error(`Create game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
