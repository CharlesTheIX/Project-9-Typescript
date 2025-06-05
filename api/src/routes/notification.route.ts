import * as gbl from "../globals";
import express, { Router, Request, Response } from "express";
import createNotification from "../functions/notification/createNotification";
import getAllNotifications from "../functions/notification/getAllNotifications";
import getNotificationById from "../functions/notification/getNotificationById";
import deleteNotificationById from "../functions/notification/deleteNotificationById";
import updateNotificationById from "../functions/notification/updateNotificationById";
import getNotificationsContainingParticipants from "../functions/notification/getNotificationsContainingParticipants";

const router: Router = express.Router();

// Get all notifications
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { limit } = request.body;

  try {
    const res = await getAllNotifications({ limit, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get all notifications error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get notification by _id
router.route("/by-id").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await getNotificationById({ _id, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get notification by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Get notifications containing participants
router.route("/by-participants").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { participants } = request.body;

  if (!participants || participants.length < 1)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: participants." });

  try {
    const res = await getNotificationsContainingParticipants({ participants, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Get notifications containing participants error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Create notification
router.route("/create").post(async (request: Request, response: Response): Promise<any> => {
  const { subject, participants, messages, type, readBy } = request.body;

  if (!subject || !participants || participants.length === 0 || !messages || messages.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: subject, participants, messages."
    });
  }

  try {
    const res = await createNotification({ subject, participants, messages, type, readBy });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create notification error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Update notification by _id
router.route("/by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;
  const { _id, update } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await updateNotificationById({ _id, update, query });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update notification by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Delete notification by _id
router.route("/by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _id } = request.body;

  if (!_id) return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _id." });

  try {
    const res = await deleteNotificationById(_id);
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete notification by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
