"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  ChevronDown,
  ShoppingBag,
  MenuIcon,
  CircleUserIcon,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = React.useState(false);

  return (
    <div className="sticky flexBetween top-0 z-10 bg-white px-10 py-6">
      <Link href="/">
        <Image src="/StylieLogo.png" alt="StylieLogo" width={150} height={70} />
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" className="hover:scale-110 hover:text-orange">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              id="shopMenu"
              href="/cart"
              className=" flexCenter hover:scale-110 hover:text-orange"
            >
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] h-[300px] bg-white">Collections</div>
              </NavigationMenuContent>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" className="hover:scale-110 hover:text-orange">
              Sale
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <div className="relative flexCenter gap-3">
            <NavigationMenuItem>
              <Link href="/cart" className="relative hover:scale-110">
                <ShoppingBag size={26} />
                <div className="absolute top-[-5px] right-[-5px] bg-orange  px-1 rounded-full">
                  <p className="text-small-medium text-white">0</p>
                </div>
              </Link>
            </NavigationMenuItem>

            {user && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <MenuIcon />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 flexStart flex-col gap-2 bg-white">
                    <Link href="/wishlist" className="hover:text-orange">
                      Wishlist
                    </Link>
                    <Link href="/orders" className="hover:text-orange">
                      Orders
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <NavigationMenuItem>
                <Link
                  href="/sign-in "
                  className="hover:scale-110 text-gray-700"
                >
                  <CircleUserIcon size={30} />
                </Link>
              </NavigationMenuItem>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
