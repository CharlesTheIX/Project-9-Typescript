"use client";
import { useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import EmailInput from "../Inputs/EmailInput";
import LoadingContainer from "../LoadingContainer";
import PasswordInput from "../Inputs/PasswordInput";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import { useThemeContext } from "@/contexts/themeContext";
import { useRouter, useSearchParams } from "next/navigation";
import validateSignIn, { SignInRequestData } from "@/functions/forms/validateSignIn";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const toast = useToastContext();
  const { theme } = useThemeContext();
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
      if (hasErrors.error) throw new Error(`Invalid ${hasErrors.message}`);

      const result = await signIn.create({ identifier: email, password });
      if (result.status !== "complete") throw new Error(`Error Signing in.`);

      await setActive({ session: result.createdSessionId }).then(() => {
        setToggle("sign-in");
      });

      const redirectionURL = searchParams?.get("redirect_url");
      router.push(redirectionURL ? decodeURIComponent(redirectionURL) : "/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      toast.setContent("");
      toast.setType("error");
      toast.setHidden(false);
      toast.setContent(error.message);
      toast.setTitle("Sign Up Failed");
    }
  };

  return (
    <div className={`form ${theme}`}>
      <form ref={formRef} onSubmit={handleSubmit} className={`max-w-xl`}>
        <div>
          <div>
            {isLoading && (
              <div className={`form-loading-container`}>
                <LoadingContainer />
              </div>
            )}

            <EmailInput name="email" label="Email" required={true} />
            <PasswordInput name="password" label="Password" required={true} />
          </div>

          <div>
            <input
              type="submit"
              content="Submit"
              disabled={isLoading}
              className={`button w-auto ${isLoading ? "disabled" : ""}`}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
