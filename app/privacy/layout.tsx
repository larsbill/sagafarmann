import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saga Farmann - Privacy Policy",
  description: "Saga Farmann: Follow the Vikings",
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}