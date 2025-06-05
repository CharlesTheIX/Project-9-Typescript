import * as gbl from "../../globals";
import Model from "../../models/user.model";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  clerkId: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { clerkId, query } = props;

  try {
    const projection = getProjectionFromQuery(query);
    const doc = await Model.findOne({ clerkId: clerkId }).select(projection).lean();
    if (!doc) return { ...gbl.response_BAD, message: `No user found with clerkId: ${clerkId}.` };
    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
