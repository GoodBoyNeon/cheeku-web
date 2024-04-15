import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Failed() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-12">
      <h1 className="text-3xl tracking-tight font-semibold">
        You are not authorized to access this web page.
      </h1>
      <Link href={"/"} className={buttonVariants({ variant: "default" })}>
        Go back
      </Link>
    </div>
  );
}
