import mongoose from 'mongoose';
import * as gbl from '../../globals';
import Model from '../../models/country.model';

export default async (_id: string): Promise<APIResponse> => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const country = await Model.findById(objectId);

    if (!country) return { ...gbl.response_BAD, message: `No country found with an id of ${_id}.` };

    return { ...gbl.response_OK, data: country };
  } catch (error: any) {
    console.error(`Get country by id error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
