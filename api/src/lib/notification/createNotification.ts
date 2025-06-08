import * as gbl from "../../globals";
import Model from "../../models/notification.model";

export default async (props: NotificationData): Promise<ApiResponse> => {
  const { subject, participants, messages, type, readBy } = props;

  try {
    const newDoc = new Model({
      subject,
      messages,
      participants,
      type: type || "default",
      readBy: readBy || "none",
    });
    if (!newDoc) return { ...gbl.response_BAD, message: "Notification not created." };

    const createdDoc = await newDoc.save();
    if (!createdDoc) return { ...gbl.response_BAD, message: "Notification not created." };

    return { ...gbl.response_DB_UPDATED, data: createdDoc };
  } catch (error: any) {
    console.error(`Create notification error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
