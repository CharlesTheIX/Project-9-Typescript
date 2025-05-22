"use client";

import { useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import EmailInput from "../Inputs/EmailInput";
import Toast, { ToastProps } from "../Misc/Toast";
import PasswordInput from "../Inputs/PasswordInput";
import LoadingContainer from "../Misc/LoadingContainer";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};

const SignInForm: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      const password: string = formData.get("password")?.toString() || "";

      //add validation here

      const result = await signIn.create({ identifier: email, password });
      if (result.status !== "complete") throw new Error();

      await setActive({ session: result.createdSessionId });

      const redirectionURL = searchParams?.get("redirect_url");
      router.push(redirectionURL ? decodeURIComponent(redirectionURL) : "/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      setToastData({
        hidden: false,
        type: "error",
        title: "Sign In Failed",
        content: "An error occured..."
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <div className={`${className} flex flex-col gap-5`}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}
          >
            <div className="flex flex-col gap-5 all-width-100 items-center w-full">
              <EmailInput name="email" label="Email" required={true} />
              <PasswordInput name="password" label="Password" required={true} />
              <input type="submit" content="Submit" />
            </div>
          </form>
        </div>
      )}

      <Toast {...toastData} />
    </>
  );
};

export default SignInForm;
