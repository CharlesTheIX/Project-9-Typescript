import * as gbl from '../globals';
import createUser from '../lib/user/createUser';
import getAllUsers from '../lib/user/getAllUsers';
import getUserById from '../lib/user/getUserById';
import getUserByEmail from '../lib/user/getUserByEmail';
import updateUserById from '../lib/user/updateUserById';
import deleteUserById from '../lib/user/deleteUserById';
import getUserByClerkId from '../lib/user/getUserByClerkId';
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Get all users
router.route('/all').post(async (_: Request, response: Response): Promise<any> => {
  try {
    const res = await getAllUsers();
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by _id
router.route('/by-id').post(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required inputs: _id.' });

  try {
    const res = await getUserById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by email
router.route('/by-email').post(async (request: Request, response: Response): Promise<any> => {
  const { email } = request.body;

  if (!email) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required inputs: email.' });

  try {
    const res = await getUserByEmail(email);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by email error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get user by clerkId
router.route('/by-clerk-id').post(async (request: Request, response: Response): Promise<any> => {
  const { clerkId } = request.body;

  if (!clerkId) return { ...gbl.response_BAD, message: 'Required inputs: clerkId.' };

  try {
    const res = await getUserByClerkId(clerkId);
    return response.json(res);
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create user
router.route('/create').post(async (request: Request, response: Response): Promise<any> => {
  const { email, role, clerkId, username, fullName, profileImageURL } = request.body;

  if (!email || !role || !clerkId || !username || !fullName) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: 'Required Inputs: email, role, clerkId, username, fullName.',
    });
  }

  try {
    const res = await createUser({ email, role, clerkId, username, fullName, profileImageURL });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create user error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update user by _id
router.route('/by-id').patch(async (request: Request, response: Response): Promise<any> => {
  const { _id, update } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required inputs: _id.' });

  try {
    const res = await updateUserById({ _id, update });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Delete user by _id
router.route('/by-id').delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: 'Required inputs: _id.' });

  try {
    const res = await deleteUserById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete user by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
