export default (value: any, minLength: number = 0): boolean => {
  var response: boolean = true;

  try {
    if (!Array.isArray(value)) response = false;
    if (value.length < minLength) response = false;
    for (var a: number = 0; a < value.length; a++) if (typeof value[a] !== "string") response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
