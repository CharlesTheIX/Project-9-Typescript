import UsersTable from "@/components/Tables/UsersTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const roles: UserRole[] = ["admin"];

const UsersAdminPage: React.FC = () => {
  return (
    <DefaultLayout roles={roles}>
      <section>
        <div className="flex flex-col gap-10">
          <h1>Users</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>

          <UsersTable />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default UsersAdminPage;
