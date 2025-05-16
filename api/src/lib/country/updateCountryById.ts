import mongoose from 'mongoose';
import * as gbl from '../../globals';
import getCountryById from './getCountryById';
import Model from '../../models/country.model';

type Props = {
  _id: string;
  names?: string[];
  continent?: string;
  displayName?: string;
  mapRectangle?: Rectangle;
  flagRectangle?: Rectangle;
};

export default async (props: Props): Promise<APIResponse> => {
  try {
    const { _id, displayName, names, flagRectangle, mapRectangle, continent } = props;
    const existingCountry = await getCountryById(_id);

    if (existingCountry.error) return { ...gbl.response_BAD, message: 'Country not found.' };

    const objectId = new mongoose.Types.ObjectId(_id);
    const update = {
      updatedAt: new Date(),
      continent: continent || existingCountry.data.continent,
      displayName: displayName || existingCountry.data.displayName,
      mapRectangle: mapRectangle || existingCountry.data.mapRectangle,
      flagRectangle: flagRectangle || existingCountry.data.flagRectangle,
      names: names && names.length > 0 ? names : existingCountry.data.names,
    };
    const updatedCountry = await Model.updateOne({ _id: objectId }, update, { new: true });

    if (!updatedCountry || updatedCountry?.modifiedCount === 0) return { ...gbl.response_BAD, message: 'Country not updated.' };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
