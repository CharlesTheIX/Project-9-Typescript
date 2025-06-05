import * as gbl from "../../globals";
import Model from "../../models/user.model";
import getSortFromQuery from "../getSortFromQuery";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  limit?: number;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { limit = 200, query } = props;

  try {
    const sort = getSortFromQuery(query);
    const projection = getProjectionFromQuery(query);
    const docs = await Model.find().select(projection).sort(sort).limit(limit).lean();
    if (!docs) return { ...gbl.response_BAD, message: "No users found." };
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No users found." };
    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
