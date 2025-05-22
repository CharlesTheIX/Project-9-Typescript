import SignUpForm from "@/components/Forms/SingUpForm";
const SignUpPage: React.FC = async () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <section>
        <div>
          <h1>Sign Up Page</h1>
        </div>
      </section>

      <section>
        <div>
          <SignUpForm />
        </div>
      </section>
    </main>
  );
};
export default SignUpPage;
