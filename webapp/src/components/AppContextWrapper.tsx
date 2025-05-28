import UserControls from "@/components/UserControls";
import CookieBanner from "@/components/Banners/CookieBanner";
import { UserContextProvider } from "@/contexts/userContext";
import { ToastContextProvider } from "@/contexts/toastContext";
import { ThemeContextProvider } from "@/contexts/themeContext";
import { BrowserContextProvider } from "@/contexts/browserContext";

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
            {children}
            <UserControls />
            <CookieBanner />
          </UserContextProvider>
        </ToastContextProvider>
      </ThemeContextProvider>
    </BrowserContextProvider>
  );
};

export default AppContextWrapper;
