import mongoose from "mongoose";
import * as gbl from "../../globals";
import Model from "../../models/notification.model";

export default async (participants: string[]): Promise<ApiResponse> => {
  
  try {
    var participantIds = participants.map((_id: string) => new mongoose.Types.ObjectId(_id));
    const docs = await Model.find({participants:  { $in: participantIds } });
    if (!docs) return { ...gbl.response_BAD, message: `No notifications found with the participants: ${participants.join(", ")}.` };

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get notifications containing participant error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
