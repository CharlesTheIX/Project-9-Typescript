import * as gbl from '../../globals';
import Model from '../../models/country.model';

export default async (continent: string): Promise<APIResponse> => {
  try {
    const countries = await Model.find({ continent: continent });

    if (!countries) return { ...gbl.response_BAD, message: 'No countries found.' };

    if (countries.length === 0) return { ...gbl.response_NO_CONTENT };

    return { ...gbl.response_OK, data: countries };
  } catch (error: any) {
    console.error(`get country by continent error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
