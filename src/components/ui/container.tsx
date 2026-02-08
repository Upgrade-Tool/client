import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[2000px] px-2 min-h-screen lg:px-8 pt-10 pb-20 flex flex-col gap-4",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Container;
