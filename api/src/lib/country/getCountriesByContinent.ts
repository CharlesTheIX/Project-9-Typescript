import * as gbl from "../../globals";
import Model from "../../models/country.model";

export default async (continent: string): Promise<ApiResponse> => {
  try {
    const docs = await Model.find({ continent: continent });

    if (!docs) return { ...gbl.response_BAD, message: "No countries found." };

    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No Countries found." };

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get country by continent error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
