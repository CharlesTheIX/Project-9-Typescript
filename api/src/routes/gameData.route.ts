import getAllGameData from "../lib/gameData/getAllGameData";
import createGameData from "../lib/gameData/createGameData";
import express, { Router, Request, Response } from "express";
import getGameDataById from "../lib/gameData/getGameDataById";
import createManyGameData from "../lib/gameData/createManyGameData";
import updateGameDataById from "../lib/gameData/updateGameDataById";
import deleteGameDataById from "../lib/gameData/deleteGameDataById";
import { response_BAD, response_SERVER_ERROR, status } from "../globals";
import updateManyGameDataById from "../lib/gameData/updateManyGameDataById";
import deleteManyGameDataById from "../lib/gameData/deleteManyGameDataById";

const router: Router = express.Router();

// Get all game data
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;

  try {
    const res = await getAllGameData({ query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all game data error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Get game data by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id } = request.body;

  if (!_id) return response.status(status.BAD).json({ ...response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getGameDataById({ _id, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get game data by _id error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Get game data by userId
// router.route("/by-user-id").post(async (request: Request, response: Response): Promise<any> => {
//   const query = request.query;
//   const { userId } = request.body;

//   if (!userId) return response.status(status.BAD).json({ ...response_BAD, message: "Required inputs: userId." });

//   try {
//     const res = await getGameDataByUserId({ userId, query });
//     return response.json(res);
//   } catch (error: any) {
//     console.error(`Get game data by UserId error: ${error.message}`);
//     return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
//   }
// });

// Create game data
router.route("/create").post(async (request: Request, response: Response): Promise<any> => {
  const { gameType, score, userId } = request.body;

  if (!gameType || !score || !userId) {
    return response.status(status.BAD).json({
      ...response_BAD,
      message: "Required Inputs: gameType, score, userId.",
    });
  }

  try {
    const res = await createGameData({ gameType, score, userId });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create game data error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Create many gameData
router.route("/create-many").post(async (request: Request, response: Response): Promise<any> => {
  const { gameData } = request.body;
  if (!gameData || gameData.length === 0) {
    return response.status(status.BAD).json({
      ...response_BAD,
      message: "Required Inputs: gameData.",
    });
  }

  try {
    const res = await createManyGameData({ gameData });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create many game data error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Update gameData by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id, update } = request.body;

  if (!_id) return response.status(status.BAD).json({ ...response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateGameDataById({ _id, update, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update game data by _id error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Update many gameData
router.route("/many-by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { updates } = request.body;
  if (!updates || updates.length === 0) {
    return response.status(status.BAD).json({
      ...response_BAD,
      message: "Required Inputs: updates.",
    });
  }

  try {
    const res = await updateManyGameDataById({ updates });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update many game data error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Delete gameData by _id
router.route("/by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(status.BAD).json({ ...response_BAD, message: "Required inputs: _id." });

  try {
    const res = await deleteGameDataById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete game data by _id error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

// Delete many gameData by _id
router.route("/many-by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _ids } = request.body;
  if (!_ids || _ids.length === 0)
    return response.status(status.BAD).json({ ...response_BAD, message: "Required inputs: _ids." });

  try {
    const res = await deleteManyGameDataById({ _ids });
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete many game data by _id error: ${error.message}`);
    return response.status(status.SERVER_ERROR).json(response_SERVER_ERROR);
  }
});

export default router;
