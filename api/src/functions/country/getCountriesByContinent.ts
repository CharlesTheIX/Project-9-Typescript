import * as gbl from "../../globals";
import Model from "../../models/country.model";
import getSortFromQuery from "../getSortFromQuery";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  limit?: number;
  continent: Continent;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { continent, limit = 200, query } = props;

  try {
    const sort = getSortFromQuery(query);
    const projection = getProjectionFromQuery(query);
    const docs = await Model.find({ $or: [{ continent: continent }] })
      .select(projection)
      .limit(limit)
      .sort(sort)
      .lean();

    if (!docs) return { ...gbl.response_BAD, message: "No countries found." };
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No Countries found." };

    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get country by continent error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
