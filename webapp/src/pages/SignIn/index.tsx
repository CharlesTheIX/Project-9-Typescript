import SignInForm from "@/components/Forms/SingInForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignInPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-20 flex flex-col gap-5 item-center">
          <h1>Sign In</h1>

          <div>
            <SignInForm />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default SignInPage;
