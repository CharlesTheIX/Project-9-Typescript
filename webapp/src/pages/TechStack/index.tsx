import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TechStackPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner icon="terminal" title="Tech Stack" content="Below is an outlint of the tech stack that is used for this project, from version control to database and hosting." />
      </section>

      <section></section>
    </DefaultLayout>
  );
};

export default TechStackPage;
