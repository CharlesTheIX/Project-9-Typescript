import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner icon="terminal" title="Project_9" />

        <p>
          To view the codebase, visit the{" "}
          <Link href="https://www.github.com/CharlesTheIX/Project-9-Typescript" target="_blank" className="link-text">
            Github
          </Link>{" "}
          page.
          <br />
          Check out the Project_9{" "}
          <Link href="/tech-stack" className="link-text">
            tech stack
          </Link>
          .
        </p>

        <div className="flex flex-row gap-5">
          <Link className="link-text" href="/sign-in">
            Sign In
          </Link>

          <p>|</p>

          <Link className="link-text" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>

      <section></section>
    </DefaultLayout>
  );
};

export default HomePage;
