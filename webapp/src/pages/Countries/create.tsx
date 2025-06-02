import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryCreationForm from "@/components/Forms/CountryCreationForm";

const roles: UserRole[] = ["admin", "editor"];

const CountryCreationPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section>
        <div className="flex flex-col gap-10 item-center w-full">
          <div className="flex flex-col gap-0 items-start justify-start w-full">
            <h1>Create Country</h1>

            <Link href={"/admin/countries"} className="link-text">
              Countries
            </Link>
          </div>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>

          <CountryCreationForm />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountryCreationPage;
