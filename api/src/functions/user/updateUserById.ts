import mongoose from "mongoose";
import * as gbl from "../../globals";
import getUserById from "./getUserById";
import Model from "../../models/user.model";

type Props = {
  _id: string;
  query?: any;
  update?: Partial<User>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update, query } = props;

  try {
    if (!_id) return { ...gbl.response_BAD, message: "User _id is required." };
    if (!update) return { ...gbl.response_NO_CONTENT, message: "No update provided." };

    const existingDoc = await getUserById({ _id });
    if (existingDoc.error) return { ...gbl.response_BAD, message: "User not found." };

    const objectId = new mongoose.Types.ObjectId(_id);
    const docUpdate = {
      updatedAt: new Date(),
      role: update.role || existingDoc.data.role,
      email: update.email || existingDoc.data.email,
      clerkId: update.clerkId || existingDoc.data.clerkId,
      username: update.username || existingDoc.data.username,
      profileImageURL: update.profileImageURL || existingDoc.data.profileImageURL
    };

    const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
    if (!updatedDoc || updatedDoc?.modifiedCount === 0) return { ...gbl.response_BAD, message: "User not updated." };

    const response = await getUserById({ _id, query });
    return { ...gbl.response_DB_UPDATED, data: response.data };
  } catch (error: any) {
    console.error(`Update user error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
