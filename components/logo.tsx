import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/public/octopus.png";

interface LogoProps {
  className?: string;
  logoHeight?: number;
  logoWidth?: number;
  iconOnly?: boolean;
}

export default function Logo({
  className,
  logoHeight = 32,
  logoWidth = 32,
  iconOnly,
}: LogoProps) {
  return (
    <Link
      href={"/"}
      className={cn(
        "cursor-pointer font-bold text-xl flex items-center gap-2",
        className
      )}
    >
      <Image
        src={LogoImg}
        alt="shopus-logo"
        height={logoHeight}
        width={logoWidth}
        className="shrink-0"
      />
      {!iconOnly && <span>Shopus</span>}
    </Link>
  );
}
