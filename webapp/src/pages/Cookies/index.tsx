import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CookiesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="py-50 flex flex-col gap-5">
          <h1>Cookies</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CookiesPage;
