import UsersTable from "@/components/Tables/UsersTable";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const roles: UserRole[] = ["admin"];

const UsersAdminPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="users"
          title="Users"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
        />
        <UsersTable />
      </section>
    </DefaultLayout>
  );
};

export default UsersAdminPage;
