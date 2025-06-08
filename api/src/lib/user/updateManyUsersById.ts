import mongoose from "mongoose";
import * as gbl from "../../globals";
import getUserById from "./getUserById";
import Model from "../../models/user.model";

type Props = {
  query?: any;
  updates: { _id: string; update: Partial<User> }[];
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
      const existingDoc = await getUserById({ _id: update._id });
      if (existingDoc.error || !existingDoc.data) {
        result.skipped.push(update._id);
        continue;
      }
      const objectId = new mongoose.Types.ObjectId(update._id);
      const docUpdate = {
        updatedAt: new Date(),
        role: update.update.role || existingDoc.data.role,
        email: update.update.email || existingDoc.data.email,
        friends: update.update.friends || existingDoc.data.friends,
        clerkId: update.update.clerkId || existingDoc.data.clerkId,
        username: update.update.username || existingDoc.data.username,
        profileType: update.update.profileType || existingDoc.data.profileType,
        profileImageUrl: update.update.profileImageUrl || existingDoc.data.profileImageUrl,
      };

      const updatedDoc = await Model.updateOne({ _id: objectId }, docUpdate, { new: true });
      if (!updatedDoc || updatedDoc?.modifiedCount === 0) {
        result.errors.push({ id: update._id, message: "User not updated." });
        continue;
      }

      result.created.push(update._id);
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Update may users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
