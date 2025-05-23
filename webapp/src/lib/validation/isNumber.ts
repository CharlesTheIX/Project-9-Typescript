type NumberType = "int" | "float" | "any";

export default (value: any, type: NumberType = "any"): boolean => {
  var response: boolean = true;
  const intRegex = new RegExp(/^-?\d+$/);
  const floatRegex = new RegExp(/^-?\d+(\.\d+)?$/);

  try {
    if (typeof value !== "string" && typeof value !== "number") response = false;
    const stringValue = String(value).trim();
    switch (type) {
      case "int":
        if (!intRegex.test(stringValue)) response = false;
        break;
      case "float":
        if (!floatRegex.test(stringValue)) response = false;
        break;
      case "any":
        if (!isNaN(Number(stringValue))) response = false;
        break;
    }
    return response;
  } catch (error: any) {
    return false;
  }
};
