import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { satoshi, clashDisplay } from "@/utils/fonts";
import { LayoutProvider } from "./context/LayoutContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Joseph Omage Consulting | Real Estate Services",
  description: "Real Estate, Estate Surveying & Valuation, Property Rentals, Property Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${clashDisplay.variable} overflow-x-hidden`}>
      <body className="antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <LayoutProvider>
            <main className="overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </LayoutProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
