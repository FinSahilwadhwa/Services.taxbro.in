import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaxBro Services | Business services without the complexity",
  description: "Business, tax, registration and compliance services for businesses in India.",
  icons: { icon: [{ url: "/icon.jpeg?v=taxbro-services", type: "image/jpeg" }] },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
