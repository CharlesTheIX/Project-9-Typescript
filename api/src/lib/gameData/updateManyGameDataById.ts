import mongoose from "mongoose";
import Model from "../../models/gameData.model";
import getGameDataById from "./getGameDataById";
import { response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

type Props = {
  query?: any;
  updates: { _id: string; update: Partial<GameData> }[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { updates } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const update of updates) {
      const existingDoc = await getGameDataById({ _id: update._id });
      if (existingDoc.error || !existingDoc.data) {
        result.skipped.push(update._id);
        continue;
      }

      const objectId = new mongoose.Types.ObjectId(update._id);
      const docUpdate = {
        updatedAt: new Date(),
        score: update.update.score || existingDoc.data.score,
        userId: update.update.userId || existingDoc.data.userId,
        gameType: update.update.gameType || existingDoc.data.gameType,
      };

      const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
      if (!updatedDoc || updatedDoc?.modifiedCount === 0) {
        result.errors.push({ id: update._id, message: "Game data not updated." });
        continue;
      }

      result.created.push(update._id);
    }

    return { ...response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Update many game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
