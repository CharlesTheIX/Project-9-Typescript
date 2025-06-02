import isUrl from "@/functions/validation/isUrl";
import isEmail from "@/functions/validation/isEmail";
import isUserRole from "@/functions/validation/isUserRole";
import isAlphanumeric from "@/functions/validation/isAlphanumeric";
import updateFormErrorMessage from "@/functions/forms/updateFormErrorMessage";

export default (requestData: Partial<User>): FormError => {
  const formError: FormError = { error: false, message: "" };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "role":
        if (!isUserRole(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Role");
        }
        break;
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
      case "profileImageURL":
        if (requestData[item] && !isUrl(requestData[item], "external")) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Profile Image URL");
        }
        break;
    }
  });

  return formError;
};
