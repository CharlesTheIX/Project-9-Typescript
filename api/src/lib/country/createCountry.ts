import * as gbl from '../../globals';
import Model from '../../models/country.model';
import getCountryByDisplayName from './getCountryByDisplayName';

export default async (props: Country): Promise<ApiResponse> => {
  const { displayName, names, flagRectangle, mapRectangle, continent } = props;

  try {
    const existingDoc = await getCountryByDisplayName(displayName);

    if (!existingDoc.error) return { ...gbl.response_CONFLICT, message: `Country with the display name ${displayName} already exists.` };

    const newDoc = new Model({
      names,
      continent,
      displayName,
      mapRectangle,
      flagRectangle,
    });

    if (!newDoc) return { ...gbl.response_BAD, message: 'Country not created.' };

    const createdDoc = await newDoc.save();

    if (!createdDoc) return { ...gbl.response_BAD, message: 'Country not created.' };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
