import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/notification.model";

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const doc = await Model.findById(objectId);
    if (!doc) return { ...gbl.response_BAD, message: `No notification found with an _id of ${_id}.` };

    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get notification by _id error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
