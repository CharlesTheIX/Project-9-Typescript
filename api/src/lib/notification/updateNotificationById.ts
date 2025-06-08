import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/notification.model";
import getNotificationById from "./getNotificationById";

type Props = {
  _id: string;
  query?: any;
  update?: Partial<NotificationData>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update, query } = props;

  try {
    if (!_id) return { ...gbl.response_BAD, message: "Notification _id is required." };
    if (!update) return { ...gbl.response_NO_CONTENT, message: "No update provided." };

    const existingDoc = await getNotificationById({_id});
    if (existingDoc.error) return { ...gbl.response_BAD, message: "Notification not found." };

    const objectId = new mongoose.Types.ObjectId(_id);
    const docUpdate = {
      updatedAt: new Date(),
      type: update.type || existingDoc.data.type,
      readBy: update.readBy || existingDoc.data.readBy,
      subject: update.subject || existingDoc.data.subject,
      messages: update.messages || existingDoc.data.messages,
      participants: update.participants || existingDoc.data.participants,
    };

    const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
    if (!updatedDoc || updatedDoc?.modifiedCount === 0) return { ...gbl.response_BAD, message: "Notification not updated." };

    const response = await getNotificationById({ _id, query });
    return { ...gbl.response_DB_UPDATED, data: response.data };
  } catch (error: any) {
    console.error(`Update notification error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
