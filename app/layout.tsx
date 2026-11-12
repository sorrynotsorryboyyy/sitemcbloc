import type { Metadata, Viewport } from "next";
import { Outfit, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";
import { CartProvider } from "@/lib/cart";
import { site } from "@/lib/data/site";

const body = Outfit({ variable: "--font-body", subsets: ["latin"] });
const pixel = Pixelify_Sans({ variable: "--font-pixel", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "MCBloc · Réseau de mini-jeux Minecraft", template: "%s · MCBloc" },
  description: site.description,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "MCBloc · Réseau de mini-jeux Minecraft",
    description: site.description,
    url: site.url,
    siteName: "MCBloc",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo.png", width: 1254, height: 1254, alt: "Logo MCBloc" }],
  },
};

export const viewport: Viewport = { themeColor: "#070b14" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${body.variable} ${pixel.variable} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
