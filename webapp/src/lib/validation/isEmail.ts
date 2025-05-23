export default (value: any): boolean => {
  var response: boolean = true;
  const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  try {
    if (typeof value !== "string") response = false;
    if (!regex.test(value)) response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
