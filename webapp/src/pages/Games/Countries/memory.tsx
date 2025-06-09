"use client";
import HeroBanner from "@/components/Banners/HeroBanner";
import MemoryGame from "@/components/Games/Country/Memory";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const MemoryGamePage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="globe"
          title="Memory"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>

      <section>
        <MemoryGame />
      </section>
    </DefaultLayout>
  );
};

export default MemoryGamePage;
