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

import { ShoppingBag, MenuIcon, CircleUserIcon } from "lucide-react";
import { UserButton, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();
  const [mobilMenu, setMobilMenu] = React.useState(false);

  return (
    <div>
      <div className="p-4 flexBetween md:hidden">
        <Link href="/">
          <Image
            src="/StylieLogo.png"
            alt="StylieLogo"
            width={150}
            height={70}
          />
        </Link>
        <Button onClick={() => setMobilMenu(!mobilMenu)}>
          <MenuIcon />
        </Button>
      </div>
      {mobilMenu && (
        <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden z-10">
          
          <Link href="/" className="hover:text-red-1">
            Home
          </Link>
          <Link
            href={user ? "/wishlist" : "/sign-in"}
            className="hover:text-red-1"
          >
            Wishlist
          </Link>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className="hover:text-red-1"
          >
            Orders
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-black hover:text-white"
          >
            <div className="relative">
              Cart
              <span className="absolute top-[-5px] bg-orange text-white px-1 rounded-full">
                0
              </span>
            </div>
          </Link>
          {
            user ? <SignOutButton afterSignOutUrl="/"/> : <SignInButton />
          }
        </div>
      )}


      <div className="hidden md:flexBetween sticky top-0 z-10 bg-white px-10 py-6">
        <Link href="/">
          <Image
            src="/StylieLogo.png"
            alt="StylieLogo"
            width={150}
            height={70}
          />
        </Link>

        <NavigationMenu place="left">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="hover:scale-110 hover:text-orange "
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                id="shopMenu"
                href="/cart"
                className="flexCenter hover:scale-110 hover:text-orange"
              >
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] h-[300px] bg-white p-3">
                    Collections
                  </div>
                </NavigationMenuContent>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="hover:scale-110 hover:text-orange"
              >
                Sale
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu place="right">
          <NavigationMenuList>
            <div className="relative flexCenter gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink href="/cart" className="hover:scale-110">
                  <NavigationMenuTrigger>
                    <div className="relative">
                      <ShoppingBag size={26} />
                      <div className="absolute top-[-5px] right-[-7px] bg-orange  px-1 rounded-full">
                        <p className="text-small-medium text-white">0</p>
                      </div>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] h-[90vh] bg-white p-3">Cart</div>
                  </NavigationMenuContent>
                </NavigationMenuLink>
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
                  <NavigationMenuLink
                    href="/sign-in "
                    className="hover:scale-110 text-gray-700"
                  >
                    <CircleUserIcon size={30} />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
