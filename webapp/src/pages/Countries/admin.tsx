import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountriesTable from "@/components/Tables/CountriesTable";

const roles: UserRole[] = ["admin"];

const CountriesAdminPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="globe"
          title="Countries"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
          highlights={[
            {
              type: "link",
              content: "Create",
              href: "/admin/countries/create",
            },
          ]}
        />

        <CountriesTable />
      </section>
    </DefaultLayout>
  );
};

export default CountriesAdminPage;
