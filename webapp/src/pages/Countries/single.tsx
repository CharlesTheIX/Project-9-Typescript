"use client";
import Link from "next/link";
import Image from "next/image";
import Edit_SVG from "@/components/SVGs/Edit_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import SplitLayout from "@/components/Layouts/SplitLayout";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const { theme } = useThemeContext();
  const { userRole } = useUserContext();

  return (
    <SplitLayout>
      <div>
        <div>
          <section>
            <div className="flex flex-col gap-10">
              <div className="flex flex-row gap-5 items-center">
                {userRole === "admin" && (
                  <Link className={`${theme}`} href={`/countries/edit/${country._id}`}>
                    <Edit_SVG width={60} height={60} />
                  </Link>
                )}

                <h1>{country.displayName}</h1>
              </div>

              <p className="max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut
                ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu
                aliquet erat ornare sit amet.
              </p>
            </div>
          </section>
        </div>

        <div className="max-w-lg">
          <section>
            <div className="pt-10 flex flex-col gap-10 items-center">
              <div className="image-container w-full">
                {country.imageUrl ? (
                  <Image
                    width={576}
                    height={411}
                    className="w-full"
                    alt={`${country.displayName} flag`}
                    src={country.imageUrl
                      .replace("http://localhost:3000", "")
                      .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")}
                  />
                ) : (
                  <Image className="w-full" alt="flag" src={"/assets/images/flags/oman.png"} width={576} height={411} />
                )}
              </div>

              <div className="flex flex-col items-start text-xl w-full">
                <p>
                  <strong>Capital City:</strong> London
                </p>
                <p>
                  <strong>Population:</strong> 120,000,000{" "}
                </p>
                <p>
                  <strong>Language(s):</strong> English, Gaelic, Welsh{" "}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SplitLayout>
  );
};

export default CountryPage;
