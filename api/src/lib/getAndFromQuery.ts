export type Search = { [key: string]: string };
type Props = {
  query: any;
  defaultValue?: Search[] | null;
};

export default (props: Props): Search[] | null => {
  const { query, defaultValue = null } = props;

  try {
    const and: string = query?.and;
    const value: string = query?.andValue;
    if (!value || !and) return defaultValue;

    const returnValue: Search = {};
    returnValue[and] = value;
    return [returnValue];
  } catch (error: any) {
    return defaultValue;
  }
};
