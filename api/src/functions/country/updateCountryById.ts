import mongoose from "mongoose";
import * as gbl from "../../globals";
import getCountryById from "./getCountryById";
import Model from "../../models/country.model";

type Props = {
  _id: string;
  query?: any;
  update?: Partial<Country>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update, query } = props;

  try {
    if (!_id) return { ...gbl.response_BAD, message: "Country _id is required." };
    if (!update) return { ...gbl.response_NO_CONTENT, message: "No update provided." };
    
    const existingDoc = await getCountryById({ _id });
    if (existingDoc.error) return { ...gbl.response_BAD, message: "Country not found." };

    const objectId = new mongoose.Types.ObjectId(_id);
    const docUpdate = {
      updatedAt: new Date(),
      imageUrl: update.imageUrl || existingDoc.data.imageUrl,
      languages: update.languages || existingDoc.data.languages,
      continent: update.continent || existingDoc.data.continent,
      population: update.population || existingDoc.data.population,
      description: update.description || existingDoc.data.description,
      capitalCity: update.capitalCity || existingDoc.data.capitalCity,
      displayName: update.displayName || existingDoc.data.displayName,
      mapRectangle: update.mapRectangle || existingDoc.data.mapRectangle,
      flagRectangle: update.flagRectangle || existingDoc.data.flagRectangle,
      names: update.names && update.names.length > 0 ? update.names : existingDoc.data.names
    };

    const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
    if (!updatedDoc || updatedDoc?.modifiedCount === 0) return { ...gbl.response_BAD, message: "Country not updated." };

    const response = await getCountryById({ _id, query });
    return { ...gbl.response_DB_UPDATED, data: response.data };
  } catch (error: any) {
    console.error(`Update country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
