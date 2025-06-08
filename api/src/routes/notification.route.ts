import * as gbl from "../globals";
import express, { Router, Request, Response } from "express";
import createNotification from "../lib/notification/createNotification";
import getAllNotifications from "../lib/notification/getAllNotifications";
import getNotificationById from "../lib/notification/getNotificationById";
import sendFriendInvitation from "../lib/notification/sendFriendInvitation";
import deleteNotificationById from "../lib/notification/deleteNotificationById";
import updateNotificationById from "../lib/notification/updateNotificationById";
import createManyNotifications from "../lib/notification/createManyNotifications";
import deleteManyNotificationsById from "../lib/notification/deleteManyNotificationsById";
import updateManyNotificationsById from "../lib/notification/updateManyNotificationsById";
import getNotificationsContainingParticipants from "../lib/notification/getNotificationsContainingParticipants";

const router: Router = express.Router();

// Get all notifications
router.route("/all").post(async (request: Request, response: Response): Promise<any> => {
  const query = request.query;

  try {
    const res = await getAllNotifications({ query });
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
      message: "Required Inputs: subject, participants, messages.",
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

// Create many notifications
router.route("/create-many").post(async (request: Request, response: Response): Promise<any> => {
  const { notifications } = request.body;
  if (!notifications || notifications.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: notifications.",
    });
  }

  try {
    const res = await createManyNotifications({ notifications });
    return response.json(res);
  } catch (error: any) {
    console.error(`Create many notifications error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

// Send Friend Invitation
router.route("/send-friend-invitation").post(async (request: Request, response: Response): Promise<any> => {
  const { invitationData } = request.body;

  if (!invitationData) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: notification data.",
    });
  }

  try {
    const res = await sendFriendInvitation({ invitationData });
    return response.json(res);
  } catch (error: any) {
    console.error(`Send Friend Invitation error: ${error.message}`);
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

// Update many notifications
router.route("/many-by-id").patch(async (request: Request, response: Response): Promise<any> => {
  const { updates } = request.body;
  if (!updates || updates.length === 0) {
    return response.status(gbl.status.BAD).json({
      ...gbl.response_BAD,
      message: "Required Inputs: updates.",
    });
  }

  try {
    const res = await updateManyNotificationsById({ updates });
    return response.json(res);
  } catch (error: any) {
    console.error(`Update many notifications error: ${error.message}`);
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

// Delete many notifications by _id
router.route("/many-by-id").delete(async (request: Request, response: Response): Promise<any> => {
  const { _ids } = request.body;
  if (!_ids || _ids.length === 0)
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: _ids." });

  try {
    const res = await deleteManyNotificationsById({ _ids });
    return response.json(res);
  } catch (error: any) {
    console.error(`Delete many notifications by _id error: ${error.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;
