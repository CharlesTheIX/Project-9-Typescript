import SignUpForm from "@/components/Forms/SingUpForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-20 flex flex-col gap-5 item-center">
          <h1>Sign Up Page</h1>

          <div>
            <SignUpForm />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default SignUpPage;
