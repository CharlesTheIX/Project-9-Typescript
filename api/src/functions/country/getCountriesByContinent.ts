import * as gbl from "../../globals";
import Model from "../../models/country.model";
import getSortFromQuery from "../getSortFromQuery";
import getSearchFromQuery from "../getSearchFromQuery";
import { countriesDefaultQueryValues } from "../getVariables";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
  limit?: number;
  continent: Continent;
};

const defaultQueryValues = countriesDefaultQueryValues();
export default async (props: Props): Promise<ApiResponse> => {
  const { continent, limit = 200, query } = props;

  try {
    const sort = getSortFromQuery({ query, defaultValue: defaultQueryValues.sort });
    const search = getSearchFromQuery({ query, defaultFields: defaultQueryValues.searchFields });
    const projection = getProjectionFromQuery({ query, defaultValue: defaultQueryValues.projection });
    const docs = await Model.find({ $and: [{ continent: continent }, { $or: search }] })
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
