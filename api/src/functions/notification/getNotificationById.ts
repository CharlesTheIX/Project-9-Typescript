import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/notification.model";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  _id: string;
  query?: any;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, query } = props;

  try {
    const projection = getProjectionFromQuery(query);
    const objectId = new mongoose.Types.ObjectId(_id);
    const doc = await Model.findById(objectId).select(projection).lean();
    if (!doc) return { ...gbl.response_BAD, message: `No notification found with an _id of ${_id}.` };
    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get notification by _id error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
