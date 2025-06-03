import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryCreationForm from "@/components/Forms/CountryCreationForm";

const roles: UserRole[] = ["admin", "editor"];

const CountryCreationPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="globe"
          title="Create Country"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
          highlights={[
            {
              type: "link",
              content: "Countries",
              href: "/admin/countries",
            },
          ]}
        />

        <CountryCreationForm />
      </section>
    </DefaultLayout>
  );
};

export default CountryCreationPage;
