import * as gbl from '../../globals';
import Model from '../../models/country.model';

export default async (displayName: string): Promise<APIResponse> => {
  try {
    const country = await Model.findOne({ $or: [{ displayName: displayName }] });

    if (!country) return { ...gbl.response_BAD, message: `No country found with display name: ${displayName}.` };

    return { ...gbl.response_OK, data: country };
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
