import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className, "container mx-auto px-3 md:px-4")}>
      {children}
    </div>
  );
};

export default Container;
