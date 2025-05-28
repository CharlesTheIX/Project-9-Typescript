import * as gbl from "../../globals";
import Model from "../../models/country.model";

export default async (displayName: string): Promise<ApiResponse> => {
  try {
    const doc = await Model.findOne({ $or: [{ displayName: displayName }] });
    if (!doc) return { ...gbl.response_BAD, message: `No country found with display name: ${displayName}.` };

    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
