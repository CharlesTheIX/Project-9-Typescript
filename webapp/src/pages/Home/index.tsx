import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner icon="terminal" title="Project_9" />

        <div className="max-w-3xl flex flex-col gap-5">
          <p>
            This application is a part of a larger project that is designed to be a template / repository of components
            and functionality that make up a full-stack application.
          </p>
          <p>
            To view the codebase, visit the{" "}
            <Link href="https://www.github.com/CharlesTheIX/Project-9-Typescript" target="_blank" className="link-text">
              Github
            </Link>{" "}
            page.
          </p>
        </div>

        <div className="flex flex-row gap-5">
          <Link className="button" href="/sign-in">
            Sign In
          </Link>

          <Link className="button" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
