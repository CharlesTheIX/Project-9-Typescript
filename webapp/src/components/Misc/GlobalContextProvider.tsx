import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

const GlobalContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
};

export default GlobalContextProvider;