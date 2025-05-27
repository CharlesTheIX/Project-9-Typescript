import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-10 flex flex-col gap-5">
          <h1>
            Project<span className="animate-blink">_</span>9
          </h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>

          <div className="flex flex-row gap-5">
            <Link className="button" href="/sign-in">
              Sign In
            </Link>

            <Link className="button" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
