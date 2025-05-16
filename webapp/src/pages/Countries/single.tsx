type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;

  return (
    <main>
      <section>
        <div>
          <h1>{country.displayName}</h1>
        </div>
      </section>
    </main>
  )
};

export default CountryPage;