import SignInForm from "@/components/Forms/SignInForm";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignInPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10 item-center">
        <HeroBanner title="Sign In" icon="signIn" />

        <SignInForm />
      </section>
    </DefaultLayout>
  );
};

export default SignInPage;
