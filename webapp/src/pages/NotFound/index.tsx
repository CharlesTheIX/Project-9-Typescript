import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const NotFoundPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10">
          <h1>404</h1>

          <p className="max-w-3xl">The page you are looking for does not exist.</p>

          <div>
            <Link className="button" href="/">
              Dashboard
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default NotFoundPage;
