import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/auth";
import { ChakraThemeProvider } from "@/theme/theme";
import { RootLayout } from "./root-layout";
import { ssrIsMobile } from "@/ssr/ssrIsMobile";
import { ssrSignedIn } from "@/ssr/ssrSignedIn";
import { LoadingProvider } from "@/contexts/loading";

const fonts = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "AOJ Next",
  description: "",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ssrMobile = ssrIsMobile();
  const ssrUser = ssrSignedIn();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id="aoj-app" className={fonts.className}>
        <ChakraThemeProvider>
          <ToastContainer />
          <AuthProvider ssrUser={ssrUser}>
            <LoadingProvider>
              <RootLayout ssrMobile={ssrMobile}>{children}</RootLayout>
            </LoadingProvider>
          </AuthProvider>
        </ChakraThemeProvider>
      </body>
    </html>
  );
}
