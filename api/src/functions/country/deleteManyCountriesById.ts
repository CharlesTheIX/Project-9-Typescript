import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/country.model";
import getCountryById from "./getCountryById";

type Props = {
  _ids: string[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _ids } = props;
  const result: CreateManyResponse = {
    errors: [],
    created: [],
    skipped: []
  };

  try {
    for (const _id of _ids) {
      try {
        const existingDoc = await getCountryById({ _id });
        if (existingDoc.error || !existingDoc.data) {
          result.skipped.push(_id);
          continue;
        }

        const objectId = new mongoose.Types.ObjectId(_id);
        const deletedDoc = await Model.deleteOne({ _id: objectId });
        if (deletedDoc && deletedDoc.deletedCount === 0) {
          result.errors.push({ displayName: _id, message: "Country not deleted." });
          continue;
        }

        result.created.push(_id);
      } catch (error: any) {
        result.errors.push({ displayName: _id, message: error.message });
      }
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Delete many countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
