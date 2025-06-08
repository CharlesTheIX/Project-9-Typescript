import * as gbl from "../globals";
import createUser from "../lib/user/createUser";
import getAllUsers from "../lib/user/getAllUsers";
import getUserById from "../lib/user/getUserById";
import express, { Router, Request, Response } from "express";
import getUserByEmail from "../lib/user/getUserByEmail";
import updateUserById from "../lib/user/updateUserById";
import deleteUserById from "../lib/user/deleteUserById";
import createManyUsers from "../lib/user/createManyUsers";
import getUserByClerkId from "../lib/user/getUserByClerkId";
import getUserByUsername from "../lib/user/getUserByUsername";
import updateManyUsersById from "../lib/user/updateManyUsersById";
import deleteManyUsersById from "../lib/user/deleteManyUsersById";

const router: Router = express.Router();

// Get all users
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;

  try {
    const res = await getAllUsers({ query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id } = request.body;
  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getUserById({ _id, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by email
router.route("/by-email").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { email } = request.body;
  if (!email) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: email." });

  try {
    const res = await getUserByEmail({ email, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by email error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by username
router.route("/by-username").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { username } = request.body;
  if (!username)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: username." });

  try {
    const res = await getUserByUsername({ username, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by username error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by clerkId
router.route("/by-clerk-id").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { clerkId } = request.body;
  if (!clerkId) return { ...gbl.response_BAD, message: "Required inputs: clerkId." };

  try {
    const res = await getUserByClerkId({ clerkId, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create user
router.route("/create").post(async (request: Request, response: Response): Promise<any> => {
  const { email, role, clerkId, username, profileImageUrl, profileType, friends } = request.body;
  if (!email || !role || !clerkId || !username) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: email, role, clerkId, username.",
    });
  }

  try {
    const res = await createUser({ email, role, clerkId, username, profileImageUrl, profileType, friends });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create user error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create many users
router.route("/create-many").post(async (request: Request, response: Response): Promise<any> => {
  const { users } = request.body;
  if (!users || users.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: users.",
    });
  }

  try {
    const res = await createManyUsers({ users });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create many users error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update user by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id, update } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateUserById({ _id, update, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update many users by id
router.route("/many-by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { updates } = request.body;
  if (!updates || updates.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: updates.",
    });
  }

  try {
    const res = await updateManyUsersById({ updates });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update many users error: ${error.message}`);
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

// Delete many users by _id
router.route("/many-by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _ids } = request.body;
  if (!_ids || _ids.length === 0)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _ids." });

  try {
    const res = await deleteManyUsersById({ _ids });
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete many users by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
