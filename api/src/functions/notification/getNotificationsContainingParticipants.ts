import mongoose from "mongoose";
import * as gbl from "../../globals";
import getSortFromQuery from "../getSortFromQuery";
import Model from "../../models/notification.model";
import getSearchFromQuery from "../getSearchFromQuery";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  limit?: number;
  participants: string[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { query, limit = 200, participants } = props;

  try {
    const sort = getSortFromQuery(query);
    const search = getSearchFromQuery(query);
    const projection = getProjectionFromQuery(query);
    var participantIds = participants.map((_id: string) => new mongoose.Types.ObjectId(_id));
    const docs = await Model.find({ $and: [{ participants: { $in: participantIds } }, { $or: search }] })
      .select(projection)
      .limit(limit)
      .sort(sort)
      .lean();

    if (!docs) {
      return {
        ...gbl.response_BAD,
        message: `No notifications found with the participants: ${participants.join(", ")}.`,
      };
    }

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get notifications containing participant error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
