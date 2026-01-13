import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saga Farmann - Map",
  description: "Saga Farmann: Follow the Vikings",
};

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}