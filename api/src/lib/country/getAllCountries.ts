import * as gbl from "../../globals";
import Model from "../../models/country.model";

export default async (limit: number = 200): Promise<ApiResponse> => {
  try {
    const docs = await Model.find().limit(limit);

    if (!docs) return { ...gbl.response_BAD, message: "No Countries found." };

    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No Countries found." };

    const docsArray: Country[] = docs.map((country: any) => {
      return {
        names: country.names,
        imageUrl: country.imageUrl,
        _id: country._id.toString(),
        createdAt: country.createdAt,
        updatedAt: country.updatedAt,
        continent: country.continent,
        displayName: country.displayName,
        mapRectangle: country.mapRectangle,
        flagRectangle: country.flagRectangle
      };
    });

    return { ...gbl.response_OK, data: docsArray };
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
