import isEmail from "@/functions/validation/isEmail";
import isPassword from "@/functions/validation/isPassword";
import updateFormErrorMessage from "@/functions/forms/updateFormErrorMessage";

export type SignInRequestData = {
  email: string;
  password: string;
};

export default (requestData: SignInRequestData): FormError => {
  const formError: FormError = { error: false, message: "" };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "email":
        if (!isEmail(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Email");
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
