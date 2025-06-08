import * as gbl from "../../globals";
import getAndFromQuery from "../getAndFromQuery";
import getSortFromQuery from "../getSortFromQuery";
import Model from "../../models/notification.model";
import getLimitFromQuery from "../getLimitFromQuery";
import getSearchFromQuery from "../getSearchFromQuery";
import getProjectionFromQuery from "../getProjectionFromQuery";
import { notificationsDefaultQueryValues } from "../getVariables";

type Props = {
  query?: any;
};

const defaultQueryValues = notificationsDefaultQueryValues();
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
    if (!docs) return { ...gbl.response_BAD, message: "No Notifications found." };
    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No notifications found." };
    return { ...gbl.response_OK, data: docs };
  } catch (error: any) {
    console.error(`Get all notifications error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
