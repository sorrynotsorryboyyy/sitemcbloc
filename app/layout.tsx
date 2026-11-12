import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";
import { CartProvider } from "@/lib/cart";
import { site } from "@/lib/data/site";

// Polices hébergées dans le projet (sous-ensemble latin, accents français inclus) :
// le build ne dépend plus de Google Fonts, dont les réponses ont fait échouer un déploiement Vercel.
const body = localFont({
  src: "./fonts/outfit-latin.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});
const pixel = localFont({
  src: [
    { path: "./fonts/pixelify-sans-500-latin.woff2", weight: "500" },
    { path: "./fonts/pixelify-sans-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-pixel",
  display: "swap",
});

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
