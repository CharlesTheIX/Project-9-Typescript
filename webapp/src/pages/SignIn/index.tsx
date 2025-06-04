import Link from "next/link";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import SignInForm from "@/components/Forms/SignInForm";
import HeroBanner from "@/components/Banners/HeroBanner";
import LoadingContainer from "@/components/LoadingContainer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignInPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10 item-center">
        <HeroBanner title="Sign In" icon="signIn" />
        <p>
          Need an account?{" "}
          <Link href="/sign-up" className="link-text">
            Sign up
          </Link>
          .
        </p>
        <ClerkProvider>
          <Suspense fallback={<LoadingContainer />}>
            <SignInForm />
          </Suspense>
        </ClerkProvider>
      </section>
    </DefaultLayout>
  );
};

export default SignInPage;
