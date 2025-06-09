import mongoose from "mongoose";
import Model from "../../models/gameData.model";
import getGameDataById from "./getGameDataById";
import getNotificationById from "./getGameDataById";
import { response_BAD, response_DB_UPDATED, response_NO_CONTENT, response_SERVER_ERROR } from "../../globals";

type Props = {
  _id: string;
  query?: any;
  update?: Partial<GameData>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update, query } = props;

  try {
    if (!_id) return { ...response_BAD, message: "Notification _id is required." };
    if (!update) return { ...response_NO_CONTENT, message: "No update provided." };

    const existingDoc = await getNotificationById({ _id });
    if (existingDoc.error) return { ...response_BAD, message: "Notification not found." };

    const objectId = new mongoose.Types.ObjectId(_id);
    const docUpdate = {
      updatedAt: new Date(),
      score: update.score || existingDoc.data.score,
      userId: update.userId || existingDoc.data.userId,
      gameType: update.gameType || existingDoc.data.gameType,
    };

    const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
    if (!updatedDoc || updatedDoc?.modifiedCount === 0) return { ...response_BAD, message: "Game data not updated." };

    const response = await getGameDataById({ _id, query });
    return { ...response_DB_UPDATED, data: response.data };
  } catch (error: any) {
    console.error(`Update notification error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
