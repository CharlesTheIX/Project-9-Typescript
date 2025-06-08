import isUrl from "@/lib/validation/isUrl";
import isEmail from "@/lib/validation/isEmail";
import isUserRole from "@/lib/validation/isUserRole";
import isAlphanumeric from "@/lib/validation/isAlphanumeric";
import updateFormErrorMessage from "@/lib/forms/updateFormErrorMessage";
import isUserProfilePrivacyType from "../validation/isUserProfilePrivacyType";

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
      case "profileImageUrl":
        if (requestData[item] && !isUrl(requestData[item], "external")) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Profile Image URL");
        }
        break;
      case "profilePrivacy":
        if (requestData[item] && !isUserProfilePrivacyType(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Profile privacy");
        }
        break;
    }
  });

  return formError;
};
