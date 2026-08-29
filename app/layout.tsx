import type { Metadata } from "next";
import { Lato, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./code-styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navaneeth Joshy K — Portfolio",
  description:
    "Portfolio of Navaneeth Joshy K, a UX/UI Designer and Front-End Developer based in Canada. UI/UX case studies and front-end projects.",
};

// Same Google Analytics (GA4) property used on the old portfolio, so
// traffic history stays in one place.
const GA_MEASUREMENT_ID = "G-GK5VL27KZM";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${robotoMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col z-10">
            <Header />
            <main className="relative z-10 flex-1 w-full">
              <div className="container py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
