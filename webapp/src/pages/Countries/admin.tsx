import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountriesTable from "@/components/Tables/CountriesTable";

const roles: UserRole[] = ["admin"];

const CountriesAdminPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0 items-start justify-start">
            <h1>Countries</h1>

            <Link className={`link-text`} href="/admin/countries/create">
              Create
            </Link>
          </div>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>

          <CountriesTable />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountriesAdminPage;
