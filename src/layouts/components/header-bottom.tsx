import Logo from "@/public/logo.jpg";
import Image from "next/image";
import Link from "next/link";

import * as React from "react";

import { Typography } from "@/components";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search } from "lucide-react";

const menuItems = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Giới thiệu",
    href: "/gioi-thieu",
  },
  {
    title: "Sản phẩm",
    href: "/san-pham",
    children: [
      {
        title: "Bao bì kim loại",
        href: "/bao-bi-kim-loai",
      },
      {
        title: "Bao bì nhựa",
        href: "/bao-bi-nhua",
      },
      {
        title: "Bao bì giấy",
        href: "/bao-bi-giay",
      },
    ],
  },
  {
    title: "Tin tức & Sự kiện",
    href: "/tin-tuc-su-kien",
    children: [
      {
        title: "Tin tức",
        href: "/tin-tuc",
      },
      {
        title: "Sự kiện",
        href: "/su-kien",
      },
    ],
  },
  {
    title: "Liên hệ",
    href: "/lien-he",
  },
];

export const HeaderBottom = () => {
  return (
    <div className="container flex items-center justify-between py-3">
      <Link href="/">
        <Image src={Logo} width={120} alt="logo" className="h-auto w-[120px]" />
      </Link>
      <div className="flex flex-col items-end xl:flex-row">
        <NavigationMenu className="flex-1">
          <NavigationMenuList>
            {menuItems.map((item) => {
              if (!item.children?.length) {
                return (
                  <NavigationMenuItem asChild key={item.title}>
                    <Link
                      href={item.href}
                      passHref
                      className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <Typography as="span" variant="bold-uppercase">
                        {item.title}
                      </Typography>
                    </Link>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>
                    <Link href={item.href} passHref>
                      <Typography as="span" variant="bold-uppercase">
                        {item.title}
                      </Typography>
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.children.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <Button size="icon" variant="ghost">
          <Search />
        </Button>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <Link href={href || "#"} passHref>
        <Typography as="span" variant="bold-uppercase">
          {title}
        </Typography>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
