import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (limit: number = 200): Promise<ApiResponse> => {
  try {
    const docs = await Model.find().limit(limit).select("-__v").lean();
    if (!docs) return { ...gbl.response_BAD, message: "No users found." };
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No users found." };

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
