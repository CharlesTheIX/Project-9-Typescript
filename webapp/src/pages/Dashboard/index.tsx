import HeroBanner from "@/components/Banners/HeroBanner";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <section>
        <HeroBanner
          icon="dashboard"
          title="Dashboard"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
