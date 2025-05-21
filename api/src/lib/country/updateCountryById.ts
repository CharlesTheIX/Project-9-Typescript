import mongoose from "mongoose";
import * as gbl from "../../globals";
import getCountryById from "./getCountryById";
import Model from "../../models/country.model";

type Props = {
  _id: string;
  update?: Partial<Country>;
};

export default async (props: Props): Promise<ApiResponse> => {
  try {
    const { _id, update } = props;

    if (!_id) return { ...gbl.response_BAD, message: "Country _id is required." };

    if (!update) return { ...gbl.response_NO_CONTENT, message: "No update provided." };

    const existingDoc = await getCountryById(_id);

    if (existingDoc.error) return { ...gbl.response_BAD, message: "Country not found." };

    const objectId = new mongoose.Types.ObjectId(_id);
    const docUpdate = {
      updatedAt: new Date(),
      imageUrl: update.imageUrl || existingDoc.data.imageUrl,
      continent: update.continent || existingDoc.data.continent,
      displayName: update.displayName || existingDoc.data.displayName,
      mapRectangle: update.mapRectangle || existingDoc.data.mapRectangle,
      flagRectangle: update.flagRectangle || existingDoc.data.flagRectangle,
      names: update.names && update.names.length > 0 ? update.names : existingDoc.data.names,
    };
    const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });

    if (!updatedDoc || updatedDoc?.modifiedCount === 0) return { ...gbl.response_BAD, message: "Country not updated." };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Update country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
