export default (options: ApiParamOptions): string => {
  const { limit = 200, searchValue, sort, search, project, and, andValue } = options;

  var params = "";
  if (and) {
    params += params.length === 0 ? "?" : "&";
    params += `and=${and}`;
  }

  if (andValue) {
    params += params.length === 0 ? "?" : "&";
    params += `andValue=${andValue}`;
  }

  if (searchValue) {
    params += params.length === 0 ? "?" : "&";
    params += `searchValue=${searchValue}`;
  }

  if (sort && sort.length !== 0) {
    params += params.length === 0 ? "?" : "&";
    params += `sort=`;
    sort.forEach((item: string, count: number) => {
      params += item;
      if (count + 1 < sort.length) params += ",";
    });
  }

  if (search && search.length !== 0) {
    params += params.length === 0 ? "?" : "&";
    params += `search=`;
    search.forEach((item: string, count: number) => {
      params += item;
      if (count + 1 < search.length) params += ",";
    });
  }

  if (project && project.length !== 0) {
    params += params.length === 0 ? "?" : "&";
    params += `project=`;
    project.forEach((item: string, count: number) => {
      params += item;
      if (count + 1 < project.length) params += ",";
    });
  }

  params += params.length === 0 ? "?" : "&";
  params += `limit=${limit}`;
  return params;
};
