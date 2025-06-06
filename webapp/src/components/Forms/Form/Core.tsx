"use client";
import { forwardRef } from "react";
import LoadingContainer from "@/components/LoadingContainer";

type Props = {
  isLoading?: boolean;
  children: React.ReactElement;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
};

const FormCore = forwardRef<HTMLFormElement, Props>((props: Props, ref) => {
  const { children, handleSubmit, isLoading = false } = props;

  return (
    <div className={`${isLoading ? "loading" : ""} form gap-5 w-full flex flex-col`}>
      <form ref={ref} onSubmit={handleSubmit} className={`max-w-xl w-full flex items-center flex-col justify-start`}>
        <div className="inner gap-5 w-full flex items-center flex-col">
          <div className="w-full gap-5 flex relative items-center flex-col">
            {isLoading && (
              <div className={`form-loading-container w-full h-full absolute`}>
                <LoadingContainer />
              </div>
            )}
            {children}
          </div>

          <div className="w-full">
            <button type="submit" disabled={isLoading} className={`button w-auto ${isLoading ? "disabled" : ""}`}>
              {isLoading ? "Loading" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default FormCore;
