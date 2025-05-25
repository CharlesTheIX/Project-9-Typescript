"use client";
import { useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import TextInput from "../Inputs/TextInput";
import EmailInput from "../Inputs/EmailInput";
import createUser from "@/functions/users/createUser";
import isNumber from "@/functions/validation/isNumber";
import PasswordInput from "../Inputs/PasswordInput";
import LoadingContainer from "../Misc/LoadingContainer";
import validateSignUp from "@/functions/forms/validateSignUp";
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
      const surname: string = formData.get("surname")?.toString() || "";
      const username: string = formData.get("username")?.toString() || "";
      const password: string = formData.get("password")?.toString() || "";
      const firstName: string = formData.get("first-name")?.toString() || "";
      const confirmedPassword: string = formData.get("password-confirmation")?.toString() || "";
      const requestData: Partial<User> & { password: string } = { email, surname, password, username, firstName };

      const hasError = validateSignUp(requestData);
      if (hasError.error) throw new Error(hasError.message);
      if (password !== confirmedPassword) throw new Error("Passwords do not match.");

      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle(`A verification code has been sent to ${email}.`);
      setSignUpData({ email, surname, username, firstName, clerkId: "", role: "user" });
    } catch (error: any) {
      console.error(error);
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
        surname: signUpData.surname,
        username: signUpData.username,
        firstName: signUpData.firstName,
        clerkId: signUp.createdUserId as string,
      });
      if (response.error) throw new Error(response.message);

      await setActive({ session: signUp.createdSessionId });

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
        <div className={`flex flex-col gap-5`}>
          <form ref={verificationFormRef} onSubmit={handleVerification} className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}>
            {isLoading ? (
              <LoadingContainer />
            ) : (
              <div className="flex flex-col gap-5 all-width-100 items-center w-full">
                <TextInput name="code" label="Code" required={true} />
                <input className="button" type="submit" content="Submit" />
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className={`flex flex-col gap-5`}>
          <form ref={formRef} onSubmit={handleSubmit} className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}>
            <div id="clerk-captcha" />

            {isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                <div className="flex flex-col gap-5 all-width-100 items-center w-full">
                  <TextInput name="username" label="Username" required={true} />

                  <div className="flex flex-row justify-between gap-5 items-center">
                    <TextInput name="first-name" label="First Name" required={true} />
                    <TextInput name="surname" label="Surname" required={true} />
                  </div>

                  <EmailInput name="email" label="Email" required={true} />
                  <PasswordInput name="password" label="Password" required={true} includeConfirmation={true} />
                  <input className="button" type="submit" content="Submit" />
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
