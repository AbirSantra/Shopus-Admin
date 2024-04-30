import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/public/octopus.png";

interface LogoProps {
  className?: string;
  logoClassName?: string;
  iconOnly?: boolean;
}

export default function Logo({
  className,
  logoClassName,
  iconOnly,
}: LogoProps) {
  return (
    <Link
      href={"/"}
      className={cn(
        "cursor-pointer font-bold text-xl flex items-center justify-center gap-2",
        className
      )}
    >
      <div className={cn("", logoClassName)}>
        <Image src={LogoImg} alt="shopus-logo" />
      </div>
      {!iconOnly && <span>Shopus</span>}
    </Link>
  );
}
