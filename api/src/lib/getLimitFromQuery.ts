type Props = {
  query: any;
  defaultValue?: number;
};

export default (props: Props): number => {
  const { query, defaultValue = 200 } = props;

  try {
    const limit: string = query?.limit;
    if (!limit) return defaultValue;
    return parseInt(limit);
  } catch (error: any) {
    return defaultValue;
  }
};
