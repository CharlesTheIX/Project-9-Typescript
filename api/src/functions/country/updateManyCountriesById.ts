import mongoose from "mongoose";
import * as gbl from "../../globals";
import getCountryById from "./getCountryById";
import Model from "../../models/country.model";

type Props = {
  query?: any;
  updates: { _id: string; update: Partial<Country> }[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { updates } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: []
  };

  try {
    for (const update of updates) {
      const existingDoc = await getCountryById({ _id: update._id });
      if (existingDoc.error || !existingDoc.data) {
        result.skipped.push(update._id);
        continue;
      }

      const objectId = new mongoose.Types.ObjectId(update._id);
      const docUpdate = {
        updatedAt: new Date(),
        imageUrl: update.update.imageUrl || existingDoc.data.imageUrl || "",
        languages: update.update.languages || existingDoc.data.languages || [],
        continent: update.update.continent || existingDoc.data.continent,
        population: update.update.population || existingDoc.data.population || 0,
        description: update.update.description || existingDoc.data.description || "",
        capitalCity: update.update.capitalCity || existingDoc.data.capitalCity || "",
        displayName: update.update.displayName || existingDoc.data.displayName,
        mapRectangle: update.update.mapRectangle || existingDoc.data.mapRectangle,
        flagRectangle: update.update.flagRectangle || existingDoc.data.flagRectangle,
        names: update.update.names && update.update.names.length > 0 ? update.update.names : existingDoc.data.names || []
      };

      const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
      if (!updatedDoc || updatedDoc?.modifiedCount === 0) {
        result.errors.push({ id: update._id, message: "Country not updated." });
        continue;
      }

      result.created.push(update._id);
    }

    return { ...gbl.response_DB_UPDATED, data:result };
  } catch (error: any) {
    console.error(`Update many countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
