import * as gbl from '../globals';
import createCountry from '../lib/country/createCountry';
import getCountryById from '../lib/country/getCountryById';
import getAllCountries from '../lib/country/getAllCountries';
import express, { Router, Request, Response } from 'express';
import deleteCountryById from '../lib/country/deleteCountryById';
import updateCountryById from '../lib/country/updateCountryById';
import getCountryByDisplayName from '../lib/country/getCountryByDisplayName';
import getCountriesByContinent from '../lib/country/getCountriesByContinent';

const router: Router = express.Router();

// Get all
router.route('/all').post(async (_: Request, response: Response): Promise<any> => {
  try {
    const res = await getAllCountries();
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get by id
router.route('/by-id').post(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: '_id is required.' });

  try {
    const res = await getCountryById(_id);
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Get country by id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get by display name
router.route('/by-display-name').post(async (request: Request, response: Response): Promise<any> => {
  const { displayName } = request.body;

  if (!displayName) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required Inputs: display name.' });

  try {
    const res = await getCountryByDisplayName(displayName);
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get by continent
router.route('/by-continent').post(async (request: Request, response: Response): Promise<any> => {
  const { continent } = request.body;

  if (!continent) return { ...gbl.response_BAD, message: 'Continent is required.' };

  try {
    const res = await getCountriesByContinent(continent);
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Get country by continent error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create
router.route('/create').post(async (request: Request, response: Response): Promise<any> => {
  const { displayName, names, flagRectangle, mapRectangle, continent } = request.body;

  if (!displayName || !names || names.length === 0 || !flagRectangle || !mapRectangle || !continent) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required Inputs: display name, names, continent, flag rectangle and map rectangle.' });
  }

  try {
    const res = await createCountry({ displayName, names, flagRectangle, mapRectangle, continent });
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update By Id
router.route('/by-id').patch(async (request: Request, response: Response): Promise<any> => {
  const { _id, displayName, names, flagRectangle, mapRectangle, continent } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: '_id is required.' });

  try {
    const res = await updateCountryById({ _id, displayName, names, flagRectangle, mapRectangle, continent });
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Update country by id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Delete By Id
router.route('/by-id').delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: '_id is required.' });

  try {
    const res = await deleteCountryById(_id);
    return response.status(res.status).json(res);
  } catch (error: any) {
    console.error(`Delete country by id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
