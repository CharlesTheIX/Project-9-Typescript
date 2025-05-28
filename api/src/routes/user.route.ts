import * as gbl from "../globals";
import createUser from "../functions/user/createUser";
import getAllUsers from "../functions/user/getAllUsers";
import getUserById from "../functions/user/getUserById";
import getUserByEmail from "../functions/user/getUserByEmail";
import updateUserById from "../functions/user/updateUserById";
import deleteUserById from "../functions/user/deleteUserById";
import getUserByClerkId from "../functions/user/getUserByClerkId";
import express, { Router, Request, Response } from "express";
import getUserByUsername from "../functions/user/getUserByUsername";

const router: Router = express.Router();

// Get all users
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const { limit } = request.body;

  try {
    const res = await getAllUsers(limit);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getUserById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by email
router.route("/by-email").post(async (request: Request, response: Response): Promise<any> => {
  const { email } = request.body;

  if (!email) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: email." });

  try {
    const res = await getUserByEmail(email);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by email error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by username
router.route("/by-username").post(async (request: Request, response: Response): Promise<any> => {
  const { username } = request.body;

  if (!username)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: username." });

  try {
    const res = await getUserByUsername(username);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by username error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by clerkId
router.route("/by-clerk-id").post(async (request: Request, response: Response): Promise<any> => {
  const { clerkId } = request.body;

  if (!clerkId) return { ...gbl.response_BAD, message: "Required inputs: clerkId." };

  try {
    const res = await getUserByClerkId(clerkId);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create user
router.route("/create").post(async (request: Request, response: Response): Promise<any> => {
  // const { email, role, clerkId, username, firstName, surname, profileImageURL } = request.body;
  const { email, role, clerkId, username, profileImageURL } = request.body;

  // if (!email || !role || !clerkId || !username || !firstName || !surname) {
  if (!email || !role || !clerkId || !username) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      // message: "Required Inputs: email, role, clerkId, username, firstName, surname.",
      message: "Required Inputs: email, role, clerkId, username.",
    });
  }

  try {
    // const res = await createUser({ email, role, clerkId, username, firstName, surname, profileImageURL });
    const res = await createUser({ email, role, clerkId, username, profileImageURL });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create user error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update user by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { _id, update } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateUserById({ _id, update });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Delete user by _id
router.route("/by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await deleteUserById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
