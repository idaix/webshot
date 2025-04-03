import { cn } from "@/lib/utils";

const Page = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn(className, "min-h-screen")}>{children}</div>;
};

export default Page;
