export default (query: any): { [key: string]: 1 | 0 } => {
  const projection: { [key: string]: 1 | 0 } = { __v: 0 };

  try {
    const fields: string = query?.project;
    if (fields) {
      fields.split(",").forEach((field: string) => {
        projection[field.trim()] = 1;
      });
    }
    return projection;
  } catch (error: any) {
    return projection;
  }
};
