import Model from "../../models/gameData.model";
import getAndFromQuery from "../getAndFromQuery";
import getSortFromQuery from "../getSortFromQuery";
import getLimitFromQuery from "../getLimitFromQuery";
import getSearchFromQuery from "../getSearchFromQuery";
import { gameDataDefaultQueryValues } from "../getVariables";
import getProjectionFromQuery from "../getProjectionFromQuery";
import { response_BAD, response_NO_CONTENT, response_OK, response_SERVER_ERROR } from "../../globals";

type Props = {
  query?: any;
};

const defaultQueryValues = gameDataDefaultQueryValues();
export default async (props: Props): Promise<ApiResponse> => {
  const { query } = props;

  try {
    const and = getAndFromQuery({ query, defaultValue: defaultQueryValues.and });
    const sort = getSortFromQuery({ query, defaultValue: defaultQueryValues.sort });
    const limit = getLimitFromQuery({ query, defaultValue: defaultQueryValues.limit });
    const search = getSearchFromQuery({ query, defaultFields: defaultQueryValues.searchFields });
    const projection = getProjectionFromQuery({ query, defaultValue: defaultQueryValues.projection });

    var filter: any = { $or: search };
    if (and) filter = { $and: [...and, filter] };

    const docs = await Model.find(filter).select(projection).sort(sort).limit(limit).lean();
    if (!docs) return { ...response_BAD, message: "No game data found." };
    if (docs.length === 0) return { ...response_NO_CONTENT, message: "No game data found." };
    return { ...response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all game data error: ${error.message}`);
    return { ...response_SERVER_ERROR, message: error.message };
  }
};
