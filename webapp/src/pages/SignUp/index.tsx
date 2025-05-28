import SignUpForm from "@/components/Forms/SignUpForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10 item-center">
          <h1>Sign Up</h1>

          <SignUpForm />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default SignUpPage;
