type UrlType = "internal" | "external" | "any";

export default (value: any, type: UrlType = "any"): boolean => {
  var response: boolean = true;
  const internalRegex = new RegExp(/^(\/|\.\/|\.\.\/)[^\s]*$/);
  const externalRegex = new RegExp(/^(https?:\/\/)[^\s/$.?#].[^\s]*$/i);

  try {
    if (typeof value !== "string") response = false;
    switch (type) {
      case "external":
        if (!externalRegex.test(value)) response = false;
        break;
      case "internal":
        if (!internalRegex.test(value)) response = false;
        break;
      case "any":
        if (!externalRegex.test(value) || !internalRegex.test(value)) response = false;
        break;
    }
    return response;
  } catch (error: any) {
    return false;
  }
};
