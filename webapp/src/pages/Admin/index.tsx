import HeroBanner from "@/components/Banners/HeroBanner";
import AdminLayout from "@/components/Layouts/AdminLayout";

const roles: UserRole[] = ["admin"];

const AdminPage: React.FC = () => {
  return (
    <AdminLayout roles={roles}>
      <section>
        <HeroBanner
          icon="admin"
          title="Admin"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>
    </AdminLayout>
  );
};

export default AdminPage;
