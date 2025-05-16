import mongoose from 'mongoose';
import * as gbl from '../../globals';
import Model from '../../models/country.model';

export default async (_id: string): Promise<APIResponse> => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const deletedCountry = await Model.deleteOne({ _id: objectId });

    if (!deletedCountry) return { ...gbl.response_BAD, message: 'Country not deleted.' };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Delete country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
