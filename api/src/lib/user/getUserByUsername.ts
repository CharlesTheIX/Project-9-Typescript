import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (username: string): Promise<ApiResponse> => {
  try {
    const doc = await Model.findOne({ username: username });
    if (!doc) return { ...gbl.response_BAD, message: `No user found with username: ${username}.` };

    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by username error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
