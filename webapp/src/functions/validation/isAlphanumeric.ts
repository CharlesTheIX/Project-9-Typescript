export default (value: any, minLength: number = 8): boolean => {
  var response: boolean = true;
  const regex = new RegExp(/^[a-zA-z0-9 ._-]+$/);

  try {
    if (typeof value !== "string") response = false;
    if (value.length < minLength) response = false;
    if (!regex.test(value)) response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
