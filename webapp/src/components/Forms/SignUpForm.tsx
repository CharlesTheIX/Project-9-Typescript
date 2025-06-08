"use client";
import FormCore from "./Form/Core";
import { useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import TextInput from "@/Inputs/TextInput";
import EmailInput from "@/Inputs/EmailInput";
import NumberInput from "@/Inputs/NumberInput";
import createUser from "@/lib/users/createUser";
import SelectInput from "../Inputs/SelectInput";
import isNumber from "@/lib/validation/isNumber";
import PasswordInput from "@/Inputs/PasswordInput";
import { userProfilePrivacyOptions } from "@/globals";
import validateSignUp from "@/lib/forms/validateSignUp";
import { useToastContext } from "@/contexts/toastContext";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const toast = useToastContext();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const verificationFormRef = useRef<HTMLFormElement>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const form = formRef.current;
      if (!form) throw new Error("Form does not exist.");

      const formData = new FormData(form);
      const email: string = formData.get("email")?.toString() || "";
      const username: string = formData.get("username")?.toString() || "";
      const password: string = formData.get("password")?.toString() || "";
      const confirmedPassword: string = formData.get("password-confirmation")?.toString() || "";
      const profilePrivacy = JSON.parse(
        formData.get("profile-privacy")?.toString() || `${userProfilePrivacyOptions[0]}`,
      ).value as UserPrivacyType;

      const requestData: Partial<User> & { password: string } = { email, password, username, profilePrivacy };

      const hasError = validateSignUp(requestData);
      if (hasError.error) throw new Error(hasError.message);
      if (password !== confirmedPassword) throw new Error("Passwords do not match.");

      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle(`A verification code has been sent to ${email}.`);
      setSignUpData({ email, username, clerkId: "", role: "user", profilePrivacy });
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Sign Up Failed");
    }
  };

  const handleVerification = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const form = verificationFormRef.current;
      if (!form) throw new Error("Form does not exist.");

      const formData = new FormData(form);
      const code: string = formData.get("code")?.toString() || "";
      if (!isNumber(code, "int")) throw new Error("Code is not a valid number.");

      await signUp.attemptEmailAddressVerification({ code });

      if (!signUpData) throw new Error("");
      const response = await createUser({
        role: "user",
        email: signUpData.email,
        username: signUpData.username,
        clerkId: signUp.createdUserId as string,
      });
      if (response.error) throw new Error(response.message);

      await setActive({ session: signUp.createdSessionId });

      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Sign Up Complete.");
      const redirectionURL = searchParams?.get("redirect_url");
      router.push(redirectionURL ? decodeURIComponent(redirectionURL) : "/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Sign Up Failed");
    }
  };

  return (
    <>
      {verifying ? (
        <FormCore ref={verificationFormRef} isLoading={isLoading} handleSubmit={handleVerification}>
          <NumberInput name="code" label="Code" required={true} min={0} max={999999} step={1} />
        </FormCore>
      ) : (
        <FormCore ref={formRef} isLoading={isLoading} handleSubmit={handleSubmit}>
          <>
            <TextInput name="username" label="Username" required={true} />
            <EmailInput name="email" label="Email" required={true} />
            <PasswordInput name="password" label="Password" required={true} includeConfirmation={true} />
            <SelectInput
              required={false}
              name="profile-privacy"
              label="Profile Privacy"
              options={userProfilePrivacyOptions}
              defaultValue={userProfilePrivacyOptions[0]}
            />
          </>
        </FormCore>
      )}
    </>
  );
};

export default SignUpForm;
