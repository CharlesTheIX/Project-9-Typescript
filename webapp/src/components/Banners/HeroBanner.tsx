import Link from "next/link";
import { Fragment } from "react";
import getSvg from "@/lib/getSvg";

export type Highlight = {
  href?: string;
  icon?: string;
  content?: string;
  callback?: () => void;
  type: "text" | "link" | "function";
};

type Props = {
  title: string;
  icon?: string;
  content?: string;
  iconSize?: number;
  highlights?: Highlight[];
};

const HeroBanner: React.FC<Props> = (props: Props) => {
  const { icon, content, title, iconSize = 75, highlights = [] } = props;

  return (
    <div className="hero-banner flex flex-col gap-5">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row gap-2 items-end justify-start">
          {getSvg({ icon, size: iconSize })}

          <h1>{title}</h1>
        </div>

        {highlights && (
          <div className="highlights flex flex-row gap-2 items-center relative font-bold">
            {highlights.map((highlight: Highlight, key: number) => {
              switch (highlight.type) {
                case "text":
                  return (
                    <Fragment key={key}>
                      {highlight.icon && <>{getSvg({ icon: highlight.icon, size: 24 })}</>}
                      {highlight.content && <p className="font-bold highlight uppercase">{highlight.content}</p>}
                      {key + 1 < highlights.length && <p>|</p>}
                    </Fragment>
                  );
                case "link":
                  return (
                    <Fragment key={key}>
                      <Link className="font-bold highlight uppercase" href={highlight.href || ""}>
                        {highlight.icon && getSvg({ icon: highlight.icon, size: 24 })}
                        {highlight.content ? highlight.content : ""}
                      </Link>
                      {key + 1 < highlights.length && <p>|</p>}
                    </Fragment>
                  );
                case "function":
                  return (
                    <Fragment key={key}>
                      <p
                        className="font-bold highlight uppercase cursor-pointer"
                        onClick={() => {
                          highlight.callback && highlight.callback();
                        }}
                      >
                        {highlight.icon && getSvg({ icon: highlight.icon, size: 24 })}
                        {highlight.content ? highlight.content : ""}
                      </p>
                      {key + 1 < highlights.length && <p>|</p>}
                    </Fragment>
                  );
              }
            })}
          </div>
        )}
      </div>

      {content && <p className="max-w-3xl">{content}</p>}
    </div>
  );
};

export default HeroBanner;
