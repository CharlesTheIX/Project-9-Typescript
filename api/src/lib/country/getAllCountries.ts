import * as gbl from '../../globals';
import Model from '../../models/country.model';

export default async (): Promise<APIResponse> => {
  try {
    const countries = await Model.find();

    if (!countries) return { ...gbl.response_BAD, message: 'No Countries found.' };

    if (countries.length === 0) return { ...gbl.response_NO_CONTENT, message: 'No Countries found.' };

    const countriesArray: Country[] = countries.map((country: any) => {
      return {
        names: country.names,
        _id: country._id.toString(),
        createdAt: country.createdAt,
        updatedAt: country.updatedAt,
        continent: country.continent,
        displayName: country.displayName,
        mapRectangle: country.mapRectangle,
        flagRectangle: country.flagRectangle,
      };
    });

    return { ...gbl.response_OK, data: countriesArray };
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
