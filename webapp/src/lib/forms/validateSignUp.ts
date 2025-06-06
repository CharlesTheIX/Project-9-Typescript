import isEmail from "@/lib/validation/isEmail";
import isPassword from "@/lib/validation/isPassword";
import isAlphanumeric from "@/lib/validation/isAlphanumeric";
import updateFormErrorMessage from "@/lib/forms/updateFormErrorMessage";

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
      case "username":
        if (!isAlphanumeric(requestData[item], 5)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Username");
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
