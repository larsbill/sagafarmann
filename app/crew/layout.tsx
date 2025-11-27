import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saga Farmann - About Us",
  description: "Saga Farmann: Follow the Vikings",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}