import * as gbl from "../../globals";
import Model from "../../models/notification.model";

type Props = {
  notifications: NotificationData[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { notifications } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const notification of notifications) {
      const { type, readBy, subject, messages, participants } = notification;

      try {
        const newDoc = new Model({
          subject,
          messages,
          participants,
          type: type || "default",
          readBy: readBy || "none",
        });

        if (!newDoc) {
          result.errors.push({ id: subject, message: "Notification not created" });
          continue;
        }

        const createdDoc = await newDoc.save();
        if (!createdDoc) {
          result.errors.push({ id: subject, message: "Notification not created" });
          continue;
        }

        result.created.push(subject);
      } catch (error: any) {
        result.errors.push({ id: notification.subject, message: error.message });
      }
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Create many notifications error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
