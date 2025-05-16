import * as gbl from '../../globals';
import Model from '../../models/country.model';
import getCountryByDisplayName from './getCountryByDisplayName';

export default async (props: Country): Promise<APIResponse> => {
  const { displayName, names, flagRectangle, mapRectangle, continent } = props;

  try {
    const existingCountry = await getCountryByDisplayName(displayName);
    console.log(existingCountry);

    if (!existingCountry.error) return { ...gbl.response_CONFLICT, message: `Country with the display name ${displayName} already exists.` };

    const newCountry = new Model({
      names,
      continent,
      displayName,
      mapRectangle,
      flagRectangle,
    });

    if (!newCountry) return { ...gbl.response_BAD, message: 'Country not created.' };

    const createdCountry = await newCountry.save();

    if (!createdCountry) return { ...gbl.response_BAD, message: 'Country not created.' };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
