import AdminLayout from "@/components/Layouts/AdminLayout";

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <section>
        <div className="py-10 flex flex-col gap-5">
          <h1>Admin</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;
