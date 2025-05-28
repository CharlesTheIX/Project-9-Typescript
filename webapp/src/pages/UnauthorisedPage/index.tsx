import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const UnauthorisedPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10">
          <h1>403</h1>

          <p className="max-w-3xl">You are not authorised to access this page.</p>

          <div className="flex flex-row gap-5">
            <Link className="button" href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default UnauthorisedPage;
