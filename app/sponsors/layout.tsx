import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saga Farmann - Sponsors",
  description: "Saga Farmann: Follow the Vikings",
};

export default function SponsorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}