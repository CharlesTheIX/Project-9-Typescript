import SignInForm from "@/components/Forms/SignInForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignInPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10 item-center">
          <h1>Sign In</h1>

          <SignInForm />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default SignInPage;
