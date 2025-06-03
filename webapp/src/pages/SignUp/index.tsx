import SignUpForm from "@/components/Forms/SignUpForm";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10 item-center">
        <HeroBanner title="Sign Up" icon="signIn" />

        <SignUpForm />
      </section>
    </DefaultLayout>
  );
};

export default SignUpPage;
