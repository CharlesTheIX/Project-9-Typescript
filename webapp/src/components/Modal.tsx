"use client";
import Close_SVG from "./SVGs/Close_SVG";

type Props = {
  title?: string;
  active: boolean;
  children: React.ReactElement;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = (props: Props) => {
  const { title, active, children, setActive } = props;

  return (
    <>
      {active && (
        <div className="modal flex flex-col items-center justify-center fixed w-full h-full top-0 left-0">
          <div
            className="background top-0 left-0 w-full h-full cursor-pointer absolute"
            onClick={() => {
              setActive(false);
            }}
          />

          <div className="content p-10 max-w-5xl gap-5 flex flex-col relative items-start justify-start">
            <div className="header gap-2 flex flex-row items-center justify-end w-full">
              {title && <h2 className="w-full">{title}</h2>}

              <div
                className="cursor-pointer"
                onClick={() => {
                  setActive(false);
                }}
              >
                <Close_SVG />
              </div>
            </div>

            <div className="body scrollbar-y w-full h-full max-h-full">
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
