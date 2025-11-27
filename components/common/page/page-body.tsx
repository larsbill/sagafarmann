import { ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
};

export default function PageBody({ children }: PageBodyProps) {
  return (
    <main className="relative w-full bg-background z-10">
      <div className="container mx-auto p-6">
        {children}
      </div>
    </main>
  );
}