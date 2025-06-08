import * as gbl from "../../globals";
import getUserById from "../user/getUserById";
import updateUserById from "../user/updateUserById";
import createNotification from "./createNotification";

type Props = {
  invitationData: any;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { invitationData } = props;
  const { fromId, toId, subject, messages } = invitationData;

  try {
    const userResponse = await getUserById({ _id: fromId });
    if (userResponse.error) throw new Error(userResponse.message);

    const notificationResponse = await createNotification({
      subject,
      messages,
      readBy: "none",
      type: "invitation",
      participants: [toId],
    });
    if (notificationResponse.error) throw new Error(notificationResponse.message);

    const previousFriends: UserFriendData[] = userResponse.data.friends || [];
    const userUpdateResponse = await updateUserById({
      _id: fromId,
      update: { friends: [...previousFriends, { status: "pending", userId: toId }] },
    });
    if (userUpdateResponse.error) throw new Error(userUpdateResponse.message);
    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Send friend invitation error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
