import Link from "next/link";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="terminal"
          title="Project_9"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
        />

        <div className="flex flex-row gap-5">
          <Link className="button" href="/sign-in">
            Sign In
          </Link>

          <Link className="button" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
