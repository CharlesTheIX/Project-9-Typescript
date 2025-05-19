import CountryCreationForm from '@/components/Forms/CountryCreationForm';

const CountryCreationPage: React.FC = () => {
  return (
    <main>
      <section>
        <div>
          <h1>Countries</h1>
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
