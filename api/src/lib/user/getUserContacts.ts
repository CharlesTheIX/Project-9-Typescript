import * as gbl from "../../globals";
import getUserById from "./getUserById";
import { Types } from "mongoose";

import Model from "../../models/user.model";
import { usersDefaultQueryValues } from "../getVariables";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  _id: string;
  query?: any;
};

const defaultQueryValues = usersDefaultQueryValues();
export default async (props: Props): Promise<ApiResponse> => {
  const { _id, query } = props;

  try {
    const user = await getUserById({ _id });
    if (user.error) throw new Error(user.message);

    const contacts = user.data.contacts;
    if (!contacts || contacts.length === 0) return { ...gbl.response_NO_CONTENT, message: "No contacts found." };
    const contactUserIds = contacts.map((contact: UserContactData) => new Types.ObjectId(contact.userId));
    const projection = getProjectionFromQuery({ query, defaultValue: defaultQueryValues.projection });
    const docs = await Model.find({ _id: { $in: contactUserIds } })
      .select(projection)
      .lean();

    if (!docs) return { ...gbl.response_NO_CONTENT, message: "No contacts found." };
    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get user by _id error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
