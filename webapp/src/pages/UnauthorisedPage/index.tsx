import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const roles: UserRole[] = ["admin"];

const UnauthorisedPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner title="403" icon="error" content="You are not authorised to access this page." />

        <div className="flex flex-row gap-5">
          <Link className="button" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default UnauthorisedPage;
