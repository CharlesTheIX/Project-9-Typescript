import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (_id: string): Promise<ApiResponse> => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const deletedDoc = await Model.deleteOne({ _id: objectId });

    if (!deletedDoc) return { ...gbl.response_BAD, message: "User not deleted." };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Delete user error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
