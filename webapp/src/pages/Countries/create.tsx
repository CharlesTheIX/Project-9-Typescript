import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryCreationForm from "@/components/Forms/CountryCreationForm";

const CountryCreationPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-10 flex flex-col gap-5 item-center">
          <h1>Create Country</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>
        </div>
      </section>

      <section>
        <div>
          <CountryCreationForm />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountryCreationPage;
