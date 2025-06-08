import * as gbl from "../globals";
import createCountry from "../lib/country/createCountry";
import getCountryById from "../lib/country/getCountryById";
import express, { Router, Request, Response } from "express";
import getAllCountries from "../lib/country/getAllCountries";
import deleteCountryById from "../lib/country/deleteCountryById";
import updateCountryById from "../lib/country/updateCountryById";
import createManyCountries from "../lib/country/createManyCountries";
import getCountryByDisplayName from "../lib/country/getCountryByDisplayName";
import deleteManyCountriesById from "../lib/country/deleteManyCountriesById";
import updateManyCountriesById from "../lib/country/updateManyCountriesById";

const router: Router = express.Router();

// Get all countries
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;

  try {
    const res = await getAllCountries({ query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get country by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id } = request.body;
  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getCountryById({ _id, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get country by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get country by displayName
router.route("/by-display-name").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { displayName } = request.body;
  if (!displayName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: displayName." });
  }

  try {
    const res = await getCountryByDisplayName({ displayName, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
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

// Create many countries
router.route("/create-many").post(async (request: Request, response: Response): Promise<any> => {
  const { countries } = request.body;
  if (!countries || countries.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required inputs: countries.",
    });
  }

  try {
    const res = await createManyCountries({ countries });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create many countries error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update country by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id, update } = request.body;
  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateCountryById({ _id, update, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update country by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update many countries by _id
router.route("/many-by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { updates } = request.body;
  if (!updates || updates.length === 0)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: updates." });

  try {
    const res = await updateManyCountriesById({ updates });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update many countries by _id error: ${error.message}`);
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

// Delete many countries by _id
router.route("/many-by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _ids } = request.body;
  if (!_ids || _ids.length === 0)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _ids." });

  try {
    const res = await deleteManyCountriesById({ _ids });
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete many countries by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
