"use client";

import { cn } from "@/lib/utils";
import {
  HomeIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  PackageIcon,
  QrCodeIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
      icon: <HomeIcon />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      icon: <LayoutGridIcon />,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
      icon: <PackageIcon />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      icon: <ShoppingCartIcon />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      icon: <MegaphoneIcon />,
    },
    {
      href: `/${params.storeId}/customers`,
      label: "Customers",
      active: pathname === `/${params.storeId}/customers`,
      icon: <UsersRoundIcon />,
    },
    {
      href: `/${params.storeId}/warranty`,
      label: "Warranties",
      active: pathname === `/${params.storeId}/warranty`,
      icon: <QrCodeIcon />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      icon: <SettingsIcon />,
    },
  ];

  return (
    <nav className={cn("flex flex-col items-center gap-6", className)}>
      {routes.map((route) => (
        <Tooltip key={route.href}>
          <TooltipTrigger asChild>
            <Link
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors ease-in-out hover:text-orange-600 flex justify-center items-center w-10 h-10 rounded-sm",
                route.active
                  ? "text-orange-600 dark:text-white bg-orange-50"
                  : "text-muted-foreground"
              )}
            >
              {route.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{route.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
};
export default MainNav;
