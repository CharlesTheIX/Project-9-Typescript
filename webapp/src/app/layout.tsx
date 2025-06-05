import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import JetBrains from "@/styles/fonts/JetBrains";
import AppContextWrapper from "@/components/AppContextWrapper";

export const metadata: Metadata = {
  title: "P9",
  description: "",
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  }
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  width: "device-width",
  themeColor: "#222831"
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Readonly<Props>> = (props: Props) => {
  const { children } = props;

  return (
    <ClerkProvider>
      <html lang="en-gb">
        <body className={`antialiased ${JetBrains.className}`}>
          <AppContextWrapper>
            <Header />
            {children}
            <Footer />
          </AppContextWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
