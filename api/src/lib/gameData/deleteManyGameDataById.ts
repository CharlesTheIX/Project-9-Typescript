import mongoose from "mongoose";
import Model from "../../models/gameData.model";
import getGameDataById from "./getGameDataById";
import { response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

type Props = {
  _ids: string[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _ids } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const _id of _ids) {
      try {
        const existingDoc = await getGameDataById({ _id });
        if (existingDoc.error || !existingDoc.data) {
          result.skipped.push(_id);
          continue;
        }

        const objectId = new mongoose.Types.ObjectId(_id);
        const deletedDoc = await Model.deleteOne({ _id: objectId });
        if (deletedDoc && deletedDoc.deletedCount === 0) {
          result.errors.push({ id: _id, message: "Game data not deleted." });
          continue;
        }

        result.created.push(_id);
      } catch (error: any) {
        result.errors.push({ id: _id, message: error.message });
      }
    }

    return { ...response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Delete many game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
