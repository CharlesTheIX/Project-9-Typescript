import CountryFeed from '@/components/Feeds/CountryFeed';
import InternalLinkButton from '@/components/Buttons/InternalLinkButton';

const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <section>
        <div>
          <h1>Home Page</h1>
          <InternalLinkButton link="/countries/create" content="Create" />
        </div>
      </section>

      <section>
        <CountryFeed />
      </section>
    </main>
  );
};

export default HomePage;
