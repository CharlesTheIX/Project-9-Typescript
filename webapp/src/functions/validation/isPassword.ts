export default (value: any, minLength: number = 8): boolean => {
  var response: boolean = true;
  const uppercaseRegex = new RegExp(/[A-Z]/);
  const specialCharacterRegex = new RegExp(/[!£$%^&*()\-_+=\\/?.<>.#;:\[\]{}]/);
  const fullRegex = new RegExp(/^[a-zA-Z0-9!£$%^&*()\-_+=\\/?.<>.#;:\[\]{}]+$/);

  try {
    if (typeof value !== "string") response = false;
    if (value.length < minLength) response = false;
    if (!fullRegex.test(value)) response = false;
    if (!uppercaseRegex.test(value)) response = false;
    if (!specialCharacterRegex.test(value)) response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
