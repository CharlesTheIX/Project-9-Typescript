import * as gbl from "../globals";
import createCountry from "../functions/country/createCountry";
import getCountryById from "../functions/country/getCountryById";
import getAllCountries from "../functions/country/getAllCountries";
import express, { Router, Request, Response } from "express";
import deleteCountryById from "../functions/country/deleteCountryById";
import updateCountryById from "../functions/country/updateCountryById";
import getCountryByDisplayName from "../functions/country/getCountryByDisplayName";
import getCountriesByContinent from "../functions/country/getCountriesByContinent";

const router: Router = express.Router();

// Get all countries
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const { limit } = request.body;

  try {
    const res = await getAllCountries(limit);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get country by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getCountryById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get country by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get country by displayName
router.route("/by-display-name").post(async (request: Request, response: Response): Promise<any> => {
  const { displayName } = request.body;

  if (!displayName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: displayName." });
  }

  try {
    const res = await getCountryByDisplayName(displayName);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get country by continent
router.route("/by-continent").post(async (request: Request, response: Response): Promise<any> => {
  const { continent, limit } = request.body;

  if (!continent) return { ...gbl.response_BAD, message: "Required inputs: continent." };

  try {
    const res = await getCountriesByContinent({ continent, limit });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get country by continent error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create country
router.route("/create").post(async (request: Request, response: Response): Promise<any> => {
  const {
    names,
    imageUrl,
    continent,
    languages,
    population,
    displayName,
    description,
    capitalCity,
    mapRectangle,
    flagRectangle,
  } = request.body;

  if (!displayName || !names || names.length === 0 || !flagRectangle || !mapRectangle || !continent) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required inputs: displayName, names, continent, flagRectangle, mapRectangle.",
    });
  }

  try {
    const res = await createCountry({
      names,
      imageUrl,
      continent,
      languages,
      population,
      displayName,
      description,
      capitalCity,
      mapRectangle,
      flagRectangle,
    });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update country by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { _id, update } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateCountryById({ _id, update });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update country by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Delete country by _id
router.route("/by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await deleteCountryById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete country by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
