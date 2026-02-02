import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Bijouterie Pala | Joaillier Créateur à Montpellier",
  description: "Création sur mesure, transformation et expertise depuis 1975.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-obsidian">
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased text-white selection:bg-gold selection:text-black`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
