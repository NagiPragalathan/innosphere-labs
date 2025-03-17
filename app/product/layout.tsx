import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ThemeRegistry from "../ThemeRegistry";
import { Metadata } from "next";
import AICursor from "@/components/AICursor";

// Add required metadata export
export const metadata: Metadata = {
  title: "Products | InnoSphere Labs",
  description: "Explore our innovative product suite",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AICursor />
      <ScrollIndicator />
      <main>{children}</main>
      <Footer />
    </>
  );
}
