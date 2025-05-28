export default (value: any): boolean => {
  var response: boolean = true;

  try {
    if (!value) response = false;
    if (typeof value !== "object") response = false;
    if (typeof value.x !== "number") response = false;
    if (typeof value.y !== "number") response = false;
    if (typeof value.width !== "number") response = false;
    if (typeof value.height !== "number") response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
