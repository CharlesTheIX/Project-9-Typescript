"use client";

import { useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import TextInput from "../Inputs/TextInput";
import EmailInput from "../Inputs/EmailInput";
import Toast, { ToastProps } from "../Misc/Toast";
import PasswordInput from "../Inputs/PasswordInput";
import LoadingContainer from "../Misc/LoadingContainer";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};

const SignUpForm: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const verificationFormRef = useRef<HTMLFormElement>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<Partial<User> | null>(null);
  const [toastData, setToastData] = useState<ToastProps>({ content: "", type: "error" });

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
      // add validation here

      const signedUp = await signUp.create({ emailAddress: email, password });
      if (signedUp.status !== "complete") throw new Error();

      const codeSent = await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (codeSent.status !== "complete") throw new Error();

      setVerifying(true);
      setIsLoading(false);
      setToastData({
        hidden: false,
        type: "success",
        title: "Sign Up Successful",
        content: "Signed up successfully."
      });
      setSignUpData({
        email,
        surname,
        username,
        firstName,
        role: "user"
      });
    } catch (error: any) {
      setIsLoading(false);
      setToastData({
        hidden: false,
        type: "error",
        title: "Sign Up Failed",
        content: "An error occured..."
      });
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
      // add validation here

      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status !== "complete") throw new Error();

      setSignUpData((prevValue: Partial<User> | null) => {
        if (!prevValue) return null;
        return { ...prevValue, clerkId: completeSignUp.createdUserId as string };
      });

      // create user in DB here

      await setActive({ session: completeSignUp.createdSessionId });

      const redirectionURL = searchParams?.get("redirect_url");
      router.push(redirectionURL ? decodeURIComponent(redirectionURL) : "/dashboard");
    } catch (error) {
      setIsLoading(false);
      setToastData({
        hidden: false,
        type: "error",
        title: "Sign Up Failed",
        content: "An error occured..."
      });
    }
  };

  return (
    <>
      {verifying ? (
        <div className={`${className} flex flex-col gap-5`}>
          <form
            ref={verificationFormRef}
            onSubmit={handleVerification}
            className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}
          >
            {isLoading ? (
              <LoadingContainer />
            ) : (
              <div className="flex flex-col gap-5 all-width-100 items-center w-full">
                <TextInput name="code" label="Code" required={true} />
                <input type="submit" content="Submit" />
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className={`${className} flex flex-col gap-5`}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}
          >
            <div id="clerk-captcha" data-cl-theme="dark" data-cl-size="flexible" data-cl-language="en-GB" />

            {isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                <div className="flex flex-col gap-5 all-width-100 items-center w-full">
                  <TextInput name="username" label="Username" required={true} />

                  <div>
                    <TextInput name="first-name" label="First Name" required={true} />
                    <TextInput name="surname" label="Surname" required={true} />
                  </div>

                  <EmailInput name="email" label="Email" required={true} />
                  <PasswordInput name="password" label="Password" required={true} includeConfirmation={true} />
                  <input type="submit" content="Submit" />
                </div>
              </>
            )}
          </form>
        </div>
      )}

      <Toast {...toastData} />
    </>
  );
};

export default SignUpForm;
