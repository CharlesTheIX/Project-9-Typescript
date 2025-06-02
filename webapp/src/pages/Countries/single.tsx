"use client";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/contexts/userContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const { userRole } = useUserContext();
  const impersonation = useImpersonationContext();

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <section>
          <div className="flex flex-col gap-10 item-center">
            <div className="flex flex-row gap-5 items-start justify-between w-full">
              <div className="flex flex-row gap-0 items-center justify-between w-full">
                <div className="flex flex-col gap-0 justify-start w-full">
                  <h1 className="w-full">{country.displayName}</h1>

                  <p className="highlight font-bold">
                    {impersonation.user ? (
                      <>
                        {impersonation.user.role === "admin" && (
                          <>
                            <Link className="link-text" href={`/admin/countries/edit/${country._id}`}>
                              Edit
                            </Link>{" "}
                            |{" "}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {userRole === "admin" && (
                          <>
                            <Link className="link-text" href={`/admin/countries/edit/${country._id}`}>
                              Edit
                            </Link>{" "}
                            |{" "}
                          </>
                        )}
                      </>
                    )}
                    <Link href={"/countries"} className="link-text">
                      Countries
                    </Link>{" "}
                    |{" "}
                    <Link href={`/countries/${country.continent}`} className="link-text">
                      {country.continent}
                    </Link>
                  </p>
                </div>

                <div className="image-container">
                  <Image
                    width={160}
                    height={120}
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
              </div>
            </div>

            {country.description && <p>{country.description}</p>}
          </div>
        </section>

        <section>
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
                  src={country.imageUrl.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "").replace("/flags", "/worlds")}
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
    </DefaultLayout>
  );
};

export default CountryPage;
