import * as gbl from "../../globals";
import Model from "../../models/country.model";
import getSortFromQuery from "../getSortFromQuery";
import getSearchFromQuery from "../getSearchFromQuery";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  limit?: number;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { limit = 200, query } = props;

  try {
    const sort = getSortFromQuery(query);
    const search = getSearchFromQuery(query);
    const projection = getProjectionFromQuery(query);
    const docs = await Model.find({ $or: search }).select(projection).sort(sort).limit(limit).lean();

    if (!docs) return { ...gbl.response_BAD, message: "No Countries found." };
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No Countries found." };

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
