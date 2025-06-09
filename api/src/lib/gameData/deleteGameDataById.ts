import mongoose from "mongoose";
import Model from "../../models/gameData.model";
import { response_BAD, response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const deletedDoc = await Model.deleteOne({ _id: objectId });
    if (!deletedDoc) return { ...response_BAD, message: "Game data not deleted." };

    return { ...response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Delete game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
