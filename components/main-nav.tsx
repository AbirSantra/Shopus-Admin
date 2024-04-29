"use client";

import { cn } from "@/lib/utils";
import {
  HomeIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      icon: <SettingsIcon />,
    },
  ];

  return (
    <nav className={cn("flex flex-col items-center space-y-8", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors ease-in-out hover:text-orange-600",
            route.active
              ? "text-orange-600 dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.icon}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
