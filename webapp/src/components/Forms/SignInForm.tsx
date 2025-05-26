"use client";
import { useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import LoadingContainer from "../Misc/LoadingContainer";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import { useRouter, useSearchParams } from "next/navigation";
import validateSignIn, { SignInRequestData } from "@/functions/forms/validateSignIn";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const toast = useToastContext();
  const { setToggle } = useUserContext();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const form = formRef.current;
      if (!form) throw new Error("Form does not exist.");

      const formData = new FormData(form);
      const email: string = formData.get("email")?.toString() || "";
      const password: string = formData.get("password")?.toString() || "";
      const requestData: SignInRequestData = { email, password };

      const hasErrors = validateSignIn(requestData);
      if (hasErrors.error) throw new Error(hasErrors.message);

      const result = await signIn.create({ identifier: email, password });
      if (result.status !== "complete") throw new Error();

      await setActive({ session: result.createdSessionId }).then(() => {
        setToggle("sign-in");
      });

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
    <form ref={formRef} onSubmit={handleSubmit} className={`max-w-xl w-full flex flex-col items-center justify-center`}>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <div className="flex flex-col gap-5 all-width-100 items-center w-full">
          <EmailInput name="email" label="Email" required={true} />
          <PasswordInput name="password" label="Password" required={true} />
          <div>
            <input className="button w-auto" type="submit" content="Submit" />
          </div>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
