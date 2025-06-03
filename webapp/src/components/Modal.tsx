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
        <div className="modal">
          <div
            className="background"
            onClick={() => {
              setActive(false);
            }}
          />

          <div className="content">
            <div className="header">
              {title && <h2>{title}</h2>}

              <div
                onClick={() => {
                  setActive(false);
                }}
              >
                <Close_SVG />
              </div>
            </div>

            <div className="body scrollbar-y">
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
