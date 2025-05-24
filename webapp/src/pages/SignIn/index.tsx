import SignInForm from "@/components/Forms/SingInForm";

const SignInPage: React.FC = async () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <section>
        <div>
          <h1>Sign In Page</h1>
        </div>
      </section>

      <section>
        <SignInForm />
      </section>
    </main>
  );
};

export default SignInPage;
