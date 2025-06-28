"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  className?: string;
  isDefault?: boolean; // for root on redirect
}

const NavBarMainPageMenu = () => {
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    { label: "Home", href: "/", isDefault: true },
    { label: "Mock Interview", href: "/conversation" },
    { label: "Profile", href: "/userContext" },
  ];

  return (
    <div className="flex w-fit gap-6 text-md h-[50px]">
      {menuItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <div
            key={item.href}
            className={cn("h-full cursor-pointer", [
              {
                "border-y-[2px] border-solid border-b-primary border-t-transparent font-semibold":
                  isActive,
              },
              item.className,
            ])}
          >
            <a
              href={item.href}
              className={cn(
                "h-full flex items-center justify-center whitespace-nowrap",
                {
                  "text-primary/60 hover:text-primary": !isActive,
                }
              )}
            >
              {item.label}
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default NavBarMainPageMenu;
