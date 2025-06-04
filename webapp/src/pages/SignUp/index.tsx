import Link from "next/link";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import SignUpForm from "@/components/Forms/SignUpForm";
import HeroBanner from "@/components/Banners/HeroBanner";
import LoadingContainer from "@/components/LoadingContainer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10 item-center">
        <HeroBanner title="Sign Up" icon="signIn" />

        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="link-text">
            Sign in
          </Link>
          .
        </p>

        <ClerkProvider>
          <Suspense fallback={<LoadingContainer />}>
            <SignUpForm />
          </Suspense>
        </ClerkProvider>
      </section>
    </DefaultLayout>
  );
};

export default SignUpPage;
