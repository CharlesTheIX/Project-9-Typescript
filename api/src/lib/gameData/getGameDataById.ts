import mongoose from "mongoose";
import Model from "../../models/gameData.model";
import { gameDataDefaultQueryValues } from "../getVariables";
import getProjectionFromQuery from "../getProjectionFromQuery";
import { response_BAD, response_OK, response_SERVER_ERROR } from "../../globals";

type Props = {
  _id: string;
  query?: any;
};

const defaultQueryValues = gameDataDefaultQueryValues();
export default async (props: Props): Promise<ApiResponse> => {
  const { _id, query } = props;

  try {
    const projection = getProjectionFromQuery({ query, defaultValue: defaultQueryValues.projection });
    const objectId = new mongoose.Types.ObjectId(_id);
    const doc = await Model.findById(objectId).select(projection).lean();
    if (!doc) return { ...response_BAD, message: `No game data found with an _id of ${_id}.` };
    return { ...response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get game data by _id error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
