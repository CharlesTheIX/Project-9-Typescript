"use client";
import FormCore from "./Form/Core";
import { useRef, useState } from "react";
import UrlInput from "@/Inputs/UrlInput";
import TextInput from "@/Inputs/TextInput";
import EmailInput from "@/Inputs/EmailInput";
import SelectInput from "@/Inputs/SelectInput";
import updateUserById from "@/lib/users/updateUserById";
import { useToastContext } from "@/contexts/toastContext";
import validateUserCreation from "@/lib/forms/validateUserCreation";
import { nullOption, userProfilePrivacyOptions, userRoleOptions } from "@/globals";

type Props = {
  user: User;
  callback: (...props: any) => void;
};

const UserEditForm: React.FC<Props> = (props: Props) => {
  const { user, callback } = props;
  const toast = useToastContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      if (!user?._id) throw new Error("User _id could not be found.");

      const form = formRef.current;
      if (!form) throw new Error("Form does not exist.");

      const formData = new FormData(form);
      const email: string = formData.get("email")?.toString() || "";
      const username: string = formData.get("username")?.toString() || "";
      const profileImageUrl: string = formData.get("profile-image-url")?.toString() || "";
      const role = JSON.parse(formData.get("role")?.toString() || `${nullOption}`).value as UserRole;
      const profilePrivacy = JSON.parse(
        formData.get("profile-privacy")?.toString() || `${userProfilePrivacyOptions[0]}`,
      ).value as UserPrivacyType;

      const requestData: Partial<User> = {
        role,
        email,
        username,
        profilePrivacy,
        profileImageUrl,
      };

      const hasErrors = validateUserCreation(requestData);
      if (hasErrors.error) throw new Error(`Invalid ${hasErrors.message}`);

      const response = await updateUserById({ _id: user?._id, update: requestData, options: {} });
      if (response.error) throw new Error(response.message);

      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("User Updated");
      callback(response.data);
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("User Update Failed");
    }
  };

  return (
    <FormCore ref={formRef} isLoading={isLoading} handleSubmit={handleSubmit}>
      <>
        <TextInput name="username" label="Username" required={true} defaultValue={user?.username} />
        <EmailInput name="email" label="Email" required={true} defaultValue={user?.email} />
        <SelectInput
          name="role"
          label="Role"
          required={true}
          options={userRoleOptions}
          defaultValue={userRoleOptions.find((option: Option) => option.value === user?.role)}
        />
        <UrlInput name="profile-image-url" label="Profile Image Url" defaultValue={user?.profileImageUrl} />
        <SelectInput
          required={false}
          name="profile-privacy"
          label="Profile Privacy"
          options={userProfilePrivacyOptions}
          defaultValue={userProfilePrivacyOptions.find((option: Option) => option.value === user?.profilePrivacy)}
        />
      </>
    </FormCore>
  );
};

export default UserEditForm;
