import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const NotFoundPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-20 flex flex-col gap-5">
          <h1>404</h1>

          <p className="max-w-3xl">The page you are looking for does not exist.</p>

          <div className="flex flex-row gap-5">
            <Link className="button" href="/">
              Home
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default NotFoundPage;
