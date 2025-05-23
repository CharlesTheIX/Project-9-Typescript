import CountryCreationForm from "@/components/Forms/CountryCreationForm";
const CountryCreationPage: React.FC = () => {
  return (
    <main className="flex flex-col gap-10 px-50 py-10 justify-center items-center all-width-100 text-center">
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
    </main>
  );
};
export default CountryCreationPage;
