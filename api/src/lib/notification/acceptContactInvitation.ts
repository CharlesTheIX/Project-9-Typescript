import getUserById from "../user/getUserById";
import updateUserById from "../user/updateUserById";
import getNotificationById from "./getNotificationById";
import deleteNotificationById from "./deleteNotificationById";
import { response_DB_UPDATED, response_SERVER_ERROR } from "../../globals";

type Props = {
  notificationId: any;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { notificationId } = props;

  try {
    const notificationResponse = await getNotificationById({ _id: notificationId });
    if (notificationResponse.error) throw new Error(notificationResponse.message);
    if (notificationResponse.data.type !== "invitation") throw new Error("Invalid notification type.");

    const inviteeId = notificationResponse.data.messages[0].to;
    const inviterId = notificationResponse.data.messages[0].from;
    const inviteeResponse = await getUserById({ _id: inviteeId });
    const inviterResponse = await getUserById({ _id: inviterId });
    if (inviteeResponse.error) throw new Error(inviteeResponse.message);
    if (inviterResponse.error) throw new Error(inviterResponse.message);

    const existingInviterContact = inviterResponse.data.contacts.find(
      (contact: UserContactData) => contact.userId === inviteeId
    );
    const existingInviteeContact = inviteeResponse.data.contacts.find(
      (contact: UserContactData) => contact.userId === inviterId
    );
    var newInviterContacts: UserContactData[] = [...inviterResponse.data.contacts];
    var newInviteeContacts: UserContactData[] = [...inviteeResponse.data.contacts];

    if (existingInviterContact) {
      newInviterContacts = newInviterContacts.map((item: UserContactData) => {
        if (item.userId === inviteeId) {
          return {
            ...item,
            status: "active",
          };
        }
        return item;
      });
    } else {
      newInviterContacts.push({ userId: inviteeId, status: "active" });
    }

    if (existingInviteeContact) {
      newInviteeContacts = newInviteeContacts.map((item: UserContactData) => {
        if (item.userId === inviterId) {
          return {
            ...item,
            status: "active",
          };
        }
        return item;
      });
    } else {
      newInviteeContacts.push({ userId: inviterId, status: "active" });
    }

    const inviterUpdateResponse = await updateUserById({ _id: inviterId, update: { contacts: newInviterContacts } });
    const inviteeUpdateResponse = await updateUserById({ _id: inviteeId, update: { contacts: newInviteeContacts } });
    if (inviterUpdateResponse.error) throw new Error(inviterUpdateResponse.message);
    if (inviteeUpdateResponse.error) throw new Error(inviteeUpdateResponse.message);

    await deleteNotificationById(notificationId);
    return { ...response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Accept contact invitation error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
