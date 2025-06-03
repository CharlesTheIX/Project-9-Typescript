import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const NotFoundPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner title="404" icon="error" content="The page you are looking for does not exist." />

        <div className="flex flex-row gap-5">
          <Link className="button" href="/">
            Dashboard
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default NotFoundPage;
