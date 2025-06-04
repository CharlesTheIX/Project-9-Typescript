type Props = { sort: "asc" | "desc"; key: string; data: any[] };

export default (props: Props): any[] => {
  const { sort, key, data } = props;
  const newData: any[] = [...data];
  newData.sort((a, b) => {
    const aName = a[key];
    const bName = b[key];
    const aIsUndefined = aName === undefined;
    const bIsUndefined = bName === undefined;
    if (aIsUndefined && bIsUndefined) return 0;
    if (aIsUndefined) return 1;
    if (bIsUndefined) return -1;
    switch (sort) {
      case "asc":
        return aName!.localeCompare(bName!);
      case "desc":
        return bName!.localeCompare(aName!);
    }
  });
  return newData;
};
