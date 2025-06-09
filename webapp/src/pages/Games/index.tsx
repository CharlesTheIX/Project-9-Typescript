"use client";
import Link from "next/link";
import Globe_SVG from "@/components/SVGs/Globe_SVG";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const GamesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner
          title="Games"
          icon="games"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>

      <section>
        <div>
          <div className="card games-feed-card flex cursor-pointer flex-col items-center justify-center p-4 pl-12">
            <Link href={"/games/countries"} className="link-wrapper" />

            <div className="absolute top-2 left-2" style={{ opacity: "50%" }}>
              <Globe_SVG width={100} height={100} />
            </div>

            <div className="relative">
              <p className="font-bold text-5xl">Country Games</p>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default GamesPage;
