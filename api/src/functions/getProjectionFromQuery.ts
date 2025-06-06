type ProjectionType = { [key: string]: 1 | 0 };
type Props = {
  query: any;
  defaultValue?: ProjectionType;
}

export default (props: Props): ProjectionType => {
  const { query, defaultValue = {}} = props;
  var projection: ProjectionType = defaultValue;

  try {
    const fields: string = query?.project;
    if (fields) {
      const customProjection: ProjectionType = {};
      fields.split(",").forEach((field: string) => {
        customProjection[field.trim()] = 1;
      });
      projection = customProjection;
    }
    return projection;
  } catch (error: any) {
    return projection;
  }
};
