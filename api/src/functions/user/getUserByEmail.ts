import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (email: string): Promise<ApiResponse> => {
  try {
    const doc = await Model.findOne({ email: email });
    if (!doc) return { ...gbl.response_BAD, message: `No user found with email: ${email}.` };

    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by email error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
