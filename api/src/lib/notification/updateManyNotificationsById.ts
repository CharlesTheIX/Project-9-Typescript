import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/notification.model";
import getNotificationById from "./getNotificationById";

type Props = {
  query?: any;
  updates: { _id: string; update: Partial<NotificationData> }[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { updates } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const update of updates) {
      const existingDoc = await getNotificationById({ _id: update._id });
      if (existingDoc.error || !existingDoc.data) {
        result.skipped.push(update._id);
        continue;
      }

      const objectId = new mongoose.Types.ObjectId(update._id);
      const docUpdate = {
        updatedAt: new Date(),
        type: update.update.type || existingDoc.data.type,
        readBy: update.update.readBy || existingDoc.data.readBy,
        subject: update.update.subject || existingDoc.data.subject,
        messages: update.update.messages || existingDoc.data.messages,
        participants: update.update.participants || existingDoc.data.participants,
      };

      const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
      if (!updatedDoc || updatedDoc?.modifiedCount === 0) {
        result.errors.push({ id: update._id, message: "Notifications not updated." });
        continue;
      }

      result.created.push(update._id);
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Update many notifications error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
