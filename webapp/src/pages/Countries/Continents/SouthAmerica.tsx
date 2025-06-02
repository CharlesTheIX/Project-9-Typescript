

import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CountrySouthAmericaaPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <section>
          <div className="flex flex-col gap-10 item-center">
            <div className="flex flex-row gap-5 items-start justify-between w-full">
              <div className="flex flex-col gap-0 justify-start w-full">
                <h1 className="w-full">South America</h1>

                <p className="highlight font-bold">
                  <Link href={"/countries"} className="link-text">
                    Countries
                  </Link>
                </p>
              </div>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus, mi vel facilisis tristique, tellus
              nunc malesuada lorem, eu finibus sapien magna vitae sem. Etiam eu est velit. Proin eleifend libero quis
              augue consequat, id viverra metus convallis. Nunc rhoncus enim pellentesque nulla venenatis tempor. Mauris
              eget volutpat purus, vitae sagittis quam. Sed ut mauris eget magna vulputate finibus. Sed nec molestie
              nisl, in finibus odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris accumsan sem
              augue, nec sollicitudin elit fermentum at. Curabitur tristique mollis orci, ac auctor purus mollis et.
              Quisque vel libero sed massa fringilla bibendum. Sed et sapien ligula. Pellentesque condimentum pretium
              elementum. Fusce tristique dignissim enim, ut cursus purus laoreet eget. Vivamus eu rhoncus quam. Praesent
              a ligula eleifend, aliquet mi nec, suscipit tellus. Fusce tortor tellus, semper nec massa volutpat,
              consectetur vestibulum sapien. Mauris scelerisque purus non volutpat rutrum. Maecenas quis risus nulla.
              Nullam laoreet, risus nec lobortis sodales, odio odio gravida quam, a malesuada quam massa tristique
              justo. Duis ut augue lacus. Proin ac sem quis nisl fringilla ultrices. Praesent non venenatis sapien.
            </p>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default CountrySouthAmericaaPage;
