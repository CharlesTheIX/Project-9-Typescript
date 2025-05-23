export default (value: any): boolean => {
  var response: boolean = true;

  try {
    if (typeof value !== "string") response = false;
    if (
      value !== "Africa" ||
      value !== "Asia" ||
      value !== "Europe" ||
      value !== "Oceania" ||
      value !== "North America" ||
      value !== "south America"
    )
      response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
