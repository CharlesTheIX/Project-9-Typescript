import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TermsConditionsPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <HeroBanner
          icon="cookie"
          title="Terms & Conditions"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>
    </DefaultLayout>
  );
};

export default TermsConditionsPage;
