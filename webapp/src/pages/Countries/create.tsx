import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryCreationForm from "@/components/Forms/CountryCreationForm";

const CountryCreationPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div>
          <h1 className="text-5xl font-bold">Countries</h1>
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
