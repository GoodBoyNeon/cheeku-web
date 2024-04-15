import { buttonVariants } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

export default function Authorize() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-8">
      <h1 className="text-3xl tracking-tight font-semibold">
        Please log in using Discord to verify your identity
      </h1>

      <Link
        href={"/api/auth/discord/redirect"}
        className={buttonVariants({
          className: "bg-[#5865f2] hover:bg-[#8891f2] text-white",
        })}
      >
        <FaDiscord size={"1.3rem"} className="align-middle mr-1" />
        Login with Discord
      </Link>
    </div>
  );
}
