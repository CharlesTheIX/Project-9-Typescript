import * as gbl from "../../globals";
import Model from "../../models/country.model";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  displayName: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { displayName, query } = props;

  try {
    const projection = getProjectionFromQuery(query);
    const doc = await Model.findOne({ displayName: displayName }).select(projection).lean();
    if (!doc) return { ...gbl.response_BAD, message: `No country found with display name: ${displayName}.` };
    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get country by display name error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
