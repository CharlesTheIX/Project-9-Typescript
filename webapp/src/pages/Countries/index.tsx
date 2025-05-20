import Link from "next/link";
import CountryFeed from "@/components/Feeds/CountryFeed";

const CountriesPage: React.FC = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <section>
        <div>
          <h1>Countries</h1>
          <Link href="/countries/create">Create</Link>
        </div>
      </section>

      <section>
        <CountryFeed />
      </section>
    </main>
  );
};

export default CountriesPage;
