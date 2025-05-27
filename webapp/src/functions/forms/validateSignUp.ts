// import isName from "../validation/isName";
import isEmail from "../validation/isEmail";
import isPassword from "../validation/isPassword";
import isAlphanumeric from "../validation/isAlphanumeric";
import updateFormErrorMessage from "./updateFormErrorMessage";

export default (requestData: Partial<User> & { password: string }): FormError => {
  const formError: FormError = { error: false, message: "" };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "email":
        if (!isEmail(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Email");
        }
        break;
      // case "surname":
      //   if (!isName(requestData[item], 3)) {
      //     formError.error = true;
      //     formError.message = updateFormErrorMessage(formError.message, "Surname");
      //   }
      //   break;
      // case "firstName":
      //   if (!isName(requestData[item], 3)) {
      //     formError.error = true;
      //     formError.message = updateFormErrorMessage(formError.message, "First Name");
      //   }
      //   break;
      case "username":
        if (!isAlphanumeric(requestData[item], 5)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "First Name");
        }
        break;
      case "password":
        if (!isPassword(requestData[item], 8)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Password");
        }
        break;
    }
  });

  return formError;
};
