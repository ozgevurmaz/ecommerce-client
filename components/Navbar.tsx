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
} from "@/components/ui/navigation-menu";

import { ShoppingBag, MenuIcon, CircleUserIcon, Search } from "lucide-react";

import {
  UserButton,
  useUser,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

import { Button } from "../components/ui/button";
import Image from "next/image";
import useCart from "@/lib/hooks/useCart";
import HoverCart from "./cart/hoverCart";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [mobilMenu, setMobilMenu] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const Cart = useCart();

  return (
    <div>
      {/* Mobile Menu */}
      <div className="p-4 flexBetween md:hidden">
        <Link href="/">
          <Image
            src="/StylieLogo.png"
            alt="StylieLogo"
            width={90}
            height={0}
            style={{ width: "80%", height: "auto" }}
          />
        </Link>
        <Button onClick={() => setMobilMenu(!mobilMenu)} variant={"icon"}>
          <MenuIcon />
        </Button>
      </div>

      {mobilMenu && (
        <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden z-10">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart ({Cart.cartItems.length})</Link>
          <Link href={user ? "/wishlist" : "/sign-in"}>Wishlist</Link>
          <Link href={user ? "/orders" : "/sign-in"}>Orders</Link>
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      )}

      {/* Medium and Large Devices */}
      <div className="hidden md:flexBetween sticky top-0 z-10 bg-white px-10 py-2">
        <Link href="/">
          <Image
            src="/StylieLogo.png"
            alt="StylieLogo"
            width={150}
            height={70}
          />
        </Link>
        <div className="flexCenter gap-5">
          <div className="flexCenter border border-grey rounded-full px-2 py-1">
            <input
              type="text"
              className="outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              disabled={query === ""}
              onClick={() => {
                router.push(`/search/${query}`);
                setQuery("");
              }}
            >
              <Search className="hover:text-orange cursor-pointer h-5 w-5" />
            </button>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <div className="relative flexCenter">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/cart" className="hover:scale-110">
                    <NavigationMenuTrigger>
                      <div className="relative">
                        <ShoppingBag size={26} />
                        <div className="absolute top-[-5px] right-[-7px] bg-orange  px-1 rounded-full">
                          <p className="text-small-medium text-white">
                            {Cart.cartItems.length}
                          </p>
                        </div>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[300px] bg-gray-200 p-3">
                        <HoverCart />
                      </div>
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
                  <Link
                    href="/sign-in"
                    className="hover:scale-110 text-gray-700"
                  >
                    <CircleUserIcon size={30} />
                  </Link>
                )}
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
