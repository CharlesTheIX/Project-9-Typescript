import * as gbl from "../../globals";
import Model from "../../models/user.model";
import getAndFromQuery from "../getAndFromQuery";
import getSortFromQuery from "../getSortFromQuery";
import getLimitFromQuery from "../getLimitFromQuery";
import getSearchFromQuery from "../getSearchFromQuery";
import { usersDefaultQueryValues } from "../getVariables";
import getProjectionFromQuery from "../getProjectionFromQuery";

type Props = {
  query?: any;
};

const defaultQueryValues = usersDefaultQueryValues();
export default async (props: Props): Promise<ApiResponse> => {
  const { query } = props;

  try {
    const and = getAndFromQuery({ query, defaultValue: defaultQueryValues.add });
    const sort = getSortFromQuery({ query, defaultValue: defaultQueryValues.sort });
    const limit = getLimitFromQuery({ query, defaultValue: defaultQueryValues.limit });
    const search = getSearchFromQuery({ query, defaultFields: defaultQueryValues.searchFields });
    const projection = getProjectionFromQuery({ query, defaultValue: defaultQueryValues.projection });

    var filter: any = { $or: search };
    if (and) filter = { $and: [...and, filter] };

    const docs = await Model.find(filter).select(projection).sort(sort).limit(limit).lean();
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No users found." };
    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
