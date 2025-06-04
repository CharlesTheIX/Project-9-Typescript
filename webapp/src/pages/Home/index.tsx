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
          <Link href={process.env.NEXT_PUBLIC_REPO_LINK!} target="_blank" className="link-text">
            Github
          </Link>{" "}
          page.
        </p>

        <div className="flex flex-row gap-5">
          <Link className="button" href="/sign-in">
            Sign In
          </Link>

          <Link className="button" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>

      <section></section>
    </DefaultLayout>
  );
};

export default HomePage;
