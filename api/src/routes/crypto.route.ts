import * as gbl from "../globals";
import encryptToken from "../lib/crypto/encryptToken";
import decryptToken from "../lib/crypto/decryptToken";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Encrypt token
router.route('/encrypt').post(async (request: Request, response: Response): Promise<any> => {
  const { token } = request.body;

  if (!token) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: token." });

  try {
    const res = encryptToken(token);
    return response.json(res);
  } catch (error: any) {
    console.error(`Encrypt token error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Decrypt token
router.route('/decrypt').post(async (request: Request, response: Response): Promise<any> => {
  const { token } = request.body;

  if (!token) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: token." });

  try {
    const res = decryptToken(token);
    return response.json(res);
  } catch (error: any) {
    console.error(`Decrypt token error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;