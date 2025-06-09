import Model from "../../models/gameData.model";
import { response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

type Props = {
  gameData: GameData[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { gameData } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const data of gameData) {
      const { gameType, userId, score } = data;

      try {
        const newDoc = new Model({
          gameType,
          userId,
          score,
        });

        if (!newDoc) {
          result.errors.push({ id: userId, message: "Game data not created" });
          continue;
        }

        const createdDoc = await newDoc.save();
        if (!createdDoc) {
          result.errors.push({ id: userId, message: "Game data not created" });
          continue;
        }

        result.created.push(userId);
      } catch (error: any) {
        result.errors.push({ id: data.userId, message: error.message });
      }
    }

    return { ...response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Create many game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
