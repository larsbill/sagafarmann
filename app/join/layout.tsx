import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saga Farmann - Join",
  description: "Saga Farmann: Follow the Vikings",
};

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}