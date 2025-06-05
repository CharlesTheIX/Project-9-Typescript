import * as gbl from "../../globals";
import Model from "../../models/user.model";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  username: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { username, query } = props;

  try {
    const projection = getProjectionFromQuery(query);
    const doc = await Model.findOne({ username: username }).select(projection).lean();
    if (!doc) return { ...gbl.response_BAD, message: `No user found with username: ${username}.` };
    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by username error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
