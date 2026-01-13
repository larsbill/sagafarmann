import { ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
  fullWidth?: boolean;
};

export default function PageBody({ children, fullWidth }: PageBodyProps) {
  return (
    <main className="relative w-full bg-background z-10">
      <div className={`mx-auto py-16 px-4 sm:px-6 lg:px-8 ${fullWidth ? "w-full" : "container"}`}>
        {children}
      </div>
    </main>
  );
}