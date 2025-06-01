"use client";
import Link from "next/link";
import Image from "next/image";
import Edit_SVG from "@/components/SVGs/Edit_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import SplitLayout from "@/components/Layouts/SplitLayout";
import { count } from "console";

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
        <div className="flex flex-col gap-10">
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-5 items-start justify-between">
                <div className="flex flex-col gap-0 justify-start">
                  <h1>{country.displayName}</h1>
                  {country.continent && <h3>{country.continent}</h3>}
                </div>

                {userRole === "admin" && (
                  <Link className={`${theme}`} href={`/countries/edit/${country._id}`}>
                    <Edit_SVG width={60} height={60} />
                  </Link>
                )}
              </div>

              {country.description && <p className="max-w-3xl">{country.description}</p>}
            </div>
          </section>

          <section>
            <div className="relative">
              <Image
                width={512}
                height={341}
                alt={`atlas`}
                className="w-full h-auto"
                src={`/assets/images/world-outline.jpg`}
              />
              {country.imageUrl && (
                <>
                  <Image
                    width={512}
                    height={341}
                    className="w-full h-full top-0 left-0 absolute"
                    alt={`${country.displayName} world location`}
                    src={country.imageUrl
                      .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
                      .replace("/flags", "/worlds")}
                  />
                  <Image
                    width={512}
                    height={341}
                    className="w-full h-full top-0 left-0 absolute"
                    alt={`${country.displayName} world location`}
                    src={country.imageUrl
                      .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
                      .replace("/flags", "/world-overlays")}
                  />
                </>
              )}
            </div>
          </section>
        </div>

        <div className="max-w-lg">
          <section>
            <div className="flex flex-col gap-10 items-center">
              <div className="image-container w-full">
                <Image
                  width={512}
                  height={341}
                  className="w-full"
                  alt={`${country.displayName} flag`}
                  src={
                    country.imageUrl
                      ? country.imageUrl
                          .replace("http://localhost:3000", "")
                          .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
                      : "/assets/images/default-flag.webp"
                  }
                />
              </div>

              <div className="flex flex-col items-start text-xl w-full">
                <p>
                  <strong>Capital City: </strong>
                  {country.capitalCity ? country.capitalCity : "-"}
                </p>
                <p>
                  <strong>Population: </strong>
                  {country.population ? country.population : "-"}
                </p>
                <p>
                  <strong>Language(s): </strong>
                  {country.languages && country.languages.length > 0 ? country.languages.join(", ") : "-"}
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
