import { UserContextProvider } from "@/contexts/userContext";
import { ToastContextProvider } from "@/contexts/toastContext";
import { ThemeContextProvider } from "@/contexts/themeContext";
import { BrowserContextProvider } from "@/contexts/browserContext";
import { ImpersonationContextProvider } from "@/contexts/impersonationContext";

type Props = {
  children: React.ReactNode;
};

const AppContextWrapper: React.FC<Readonly<Props>> = (props: Props) => {
  const { children } = props;

  return (
    <BrowserContextProvider>
      <ThemeContextProvider>
        <ToastContextProvider>
          <UserContextProvider>
            <ImpersonationContextProvider>{children}</ImpersonationContextProvider>
          </UserContextProvider>
        </ToastContextProvider>
      </ThemeContextProvider>
    </BrowserContextProvider>
  );
};

export default AppContextWrapper;
