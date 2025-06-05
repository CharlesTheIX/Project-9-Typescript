import * as gbl from "../../globals";
import Model from "../../models/user.model";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  email: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { email, query } = props;

  try {
    const projection = getProjectionFromQuery(query);
    const doc = await Model.findOne({ email: email }).select(projection).lean();
    if (!doc) return { ...gbl.response_BAD, message: `No user found with email: ${email}.` };
    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by email error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
