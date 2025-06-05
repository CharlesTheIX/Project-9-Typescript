import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TechStackTabsContainer from "@/components/TabContainers/TechStackTabContainer";

const TechStackPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner icon="stack" title="Tech Stack" />

        <p className="max-w-3xl">
          Below is an outline of the tech stack that is used for this project, from version control to database and
          hosting.
          <br />
          <br />
          To view the codebase, visit the{" "}
          <Link href="https://www.github.com/CharlesTheIX/Project-9-Typescript" target="_blank" className="link-text">
            Github
          </Link>{" "}
          page.
        </p>
      </section>

    <section>
      <TechStackTabsContainer />
    </section>
    </DefaultLayout>
  );
};

export default TechStackPage;
