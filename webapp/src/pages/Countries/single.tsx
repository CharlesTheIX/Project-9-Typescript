"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";
import Map_SVG from "@/components/SVGs/Map_SVG";
import Flag_SVG from "@/components/SVGs/Flag_SVG";
import { useUserContext } from "@/contexts/userContext";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const { userRole } = useUserContext();
  const impersonation = useImpersonationContext();
  const [mapModalActive, setMapModalActive] = useState<boolean>(false);
  const [flagModalActive, setFlagModalActive] = useState<boolean>(false);

  const getHighlights = (): any[] => {
    const highlights = [];

    if (impersonation.user) {
      if (impersonation.user.role === "admin") {
        highlights.push({
          type: "link",
          content: "Edit",
          href: `/admin/countries/edit/${country?._id}`,
        });
      }
    } else {
      if (userRole === "admin") {
        highlights.push({
          type: "link",
          content: "Edit",
          href: `/admin/countries/edit/${country?._id}`,
        });
      }
    }

    highlights.push({
      type: "link",
      href: `/countries`,
      content: "Countries",
    });

    highlights.push({
      type: "link",
      content: country?.continent,
      href: `/countries/continents/${country?.continent.toLowerCase()}`,
    });

    return highlights;
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-10">
          <HeroBanner
            icon="globe"
            title={country?.displayName}
            highlights={getHighlights()}
            content={country?.description}
          />
        </section>

        <section>
          <div className="flex flex-row gap-5 items-center">
            <button
              className="button"
              onClick={() => {
                setFlagModalActive(true);
              }}
            >
              <Flag_SVG width={32} height={32} />
            </button>

            <button
              className="button"
              onClick={() => {
                setMapModalActive(true);
              }}
            >
              <Map_SVG width={32} height={32} />
            </button>
          </div>
        </section>

        <section className="flex flex-col items-start text-xl w-full">
          <p>
            <strong>Capital City: </strong>
            {country?.capitalCity ? country?.capitalCity : "-"}
          </p>
          <p>
            <strong>Population: </strong>
            {country?.population ? country?.population : "-"}
          </p>
          <p>
            <strong>Language(s): </strong>
            {country?.languages && country?.languages.length > 0 ? country?.languages.join(", ") : "-"}
          </p>
        </section>
      </div>

      <Modal title="Flag" active={flagModalActive} setActive={setFlagModalActive}>
        <Image
          width={768}
          height={512}
          alt={`${country?.displayName} flag`}
          className="mx-auto w-auto"
          src={
            country?.imageUrl
              ? country?.imageUrl.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
              : "/assets/images/default-flag.webp"
          }
        />
      </Modal>

      <Modal title="Map" active={mapModalActive} setActive={setMapModalActive}>
        <div className="relative">
          <Image
            width={512}
            height={341}
            alt={`atlas`}
            className="w-full h-auto"
            src={`/assets/images/world-outline.jpg`}
          />
          {country?.imageUrl && (
            <>
              <Image
                width={512}
                height={341}
                className="w-full h-full top-0 left-0 absolute"
                alt={`${country?.displayName} world location`}
                src={country?.imageUrl.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "").replace("/flags", "/worlds")}
              />
              <Image
                width={512}
                height={341}
                className="w-full h-full top-0 left-0 absolute"
                alt={`${country?.displayName} world location`}
                src={country?.imageUrl
                  .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
                  .replace("/flags", "/world-overlays")}
              />
            </>
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default CountryPage;
