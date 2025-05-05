"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  ShoppingBag,
  Search,
  Heart,
  Package,
  User,
  Menu as MenuIcon,
  X
} from "lucide-react";

import { Button } from "../components/ui/button";
import useCart from "@/lib/hooks/useCart";
import HoverCart from "./cart/hoverCart";
import { categories } from "@/lib/constants";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const Cart = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        {/* Top Navigation - Brand, Search, Account */}
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/StylieLogo.png"
              alt="Stylie"
              width={120}
              height={50}
              className="h-auto"
              priority
            />
          </Link>

          <div className="flex items-center space-x-8">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className={`relative flex items-center transition-all duration-200 ${isSearchFocused ? "w-80" : "w-64"
                }`}
            >
              <input
                type="text"
                placeholder="Search for styles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-2 pl-4 pr-10 text-sm border rounded-full outline-none border-gray-300 focus:border-orange focus:ring-1 focus:ring-orange transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-400 hover:text-orange transition-colors"
                disabled={!query.trim()}
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Icons Navigation */}
            <div className="flex items-center space-x-5">
              {/* Cart with Counter Badge */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className="bg-transparent hover:bg-gray-50 transition-colors p-2 flex items-center gap-2"
                      aria-label="Shopping cart"
                    >
                      <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        {Cart.cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-orange rounded-full">
                            {Cart.cartItems.length}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium">Cart</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-100">
                        <HoverCart />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Wishlist */}
              <Link
                href={user ? "/wishlist" : "/sign-in"}
                className="relative p-2 text-gray-700 hover:text-orange transition-colors flexCenter gap-2"
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6" />
                <span className="text-sm font-medium">Wishlist</span>
              </Link>

              {/* Account */}
              {user ? (
                <div className="p-2">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger
                          className="bg-transparent hover:bg-gray-50 transition-colors p-2 flexCenter gap-2"
                          aria-label="User account"
                        >
                          <User className="w-6 h-6 text-gray-700 hover:text-orange transition-colors" />
                          <span className="text-sm font-medium">Profile</span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-48 p-2 bg-white shadow-lg rounded-lg border border-gray-100">
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange rounded-md transition-colors"
                            >
                              My Profile
                            </Link><Link
                              href="/orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange rounded-md transition-colors"
                            >
                              Orders
                            </Link>
                            <SignOutButton>
                              <Button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange rounded-md transition-colors bg-transparent justify-start font-normal">
                                Sign Out
                              </Button>
                            </SignOutButton>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              ) : (
                <SignInButton>
                  <Button className="p-2 bg-transparent hover:bg-gray-50">
                    <User className="w-6 h-6 text-gray-700 hover:text-orange transition-colors" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="bg-gray-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center space-x-8">
              {categories.map((category) => (
                <li key={category.name} className="relative group">
                  <Link
                    href={category.href}
                    className="inline-block py-3 text-sm font-medium text-gray-800 hover:text-orange transition-colors"
                  >
                    {category.name}
                  </Link>

                  {/* Dropdown for subcategories */}
                  {category.subCategories && (
                    <div className="absolute left-0 mt-1 w-56 bg-white shadow-lg rounded-md p-2 invisible group-hover:visible transition-all z-20">
                      <ul className="space-y-1">
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory.name}>
                            <Link
                              href={subCategory.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange rounded-md transition-colors"
                            >
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/StylieLogo.png"
              alt="Stylie"
              width={90}
              height={40}
              className="h-auto"
            />
          </Link>

          <div className="flex items-center space-x-3">
            {/* Cart Icon for Mobile */}
            <Link href="/cart" className="relative p-2" aria-label="Cart">
              <ShoppingBag className="w-6 h-6" />
              {Cart.cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-orange rounded-full">
                  {Cart.cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <Button
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white pt-16">
            <div className="container px-6 pb-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for styles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 text-sm border rounded-lg border-gray-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-2 text-gray-400"
                    disabled={!query.trim()}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category.name} className="py-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={category.href}
                          className="text-base font-medium text-gray-800 hover:text-orange"
                          onClick={category.subCategories ? undefined : toggleMobileMenu}
                        >
                          {category.name}
                        </Link>

                        {category.subCategories && (
                          <button
                            onClick={() => {
                              const el = document.getElementById(`mobile-subcategory-${category.name}`);
                              if (el) {
                                el.classList.toggle('hidden');
                              }
                            }}
                            className="text-gray-500 p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                        )}
                      </div>

                      {category.subCategories && (
                        <ul id={`mobile-subcategory-${category.name}`} className="mt-2 ml-4 hidden space-y-2">
                          {category.subCategories.map((subCategory) => (
                            <li key={subCategory.name}>
                              <Link
                                href={subCategory.href}
                                className="text-sm text-gray-600 hover:text-orange block py-1"
                                onClick={toggleMobileMenu}
                              >
                                {subCategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Account Links */}
              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Account</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href={user ? "/wishlist" : "/sign-in"}
                      className="flex items-center text-base font-medium text-gray-800 hover:text-orange"
                      onClick={toggleMobileMenu}
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={user ? "/orders" : "/sign-in"}
                      className="flex items-center text-base font-medium text-gray-800 hover:text-orange"
                      onClick={toggleMobileMenu}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </Link>
                  </li>
                  <li>
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="flex items-center text-base font-medium text-gray-800 hover:text-orange"
                          onClick={toggleMobileMenu}
                        >
                          <User className="w-5 h-5 mr-3" />
                          My Profile
                        </Link>
                      </>
                    ) : null}
                  </li>
                  <li>
                    {user ? (
                      <SignOutButton>
                        <Button className="flex items-center p-0 text-base font-medium text-gray-800 hover:text-orange hover:bg-transparent">
                          <User className="w-5 h-5 mr-3" />
                          Sign Out
                        </Button>
                      </SignOutButton>
                    ) : (
                      <SignInButton>
                        <Button className="flex items-center p-0 text-base font-medium text-gray-800 hover:text-orange hover:bg-transparent">
                          <User className="w-5 h-5 mr-3" />
                          Sign In
                        </Button>
                      </SignInButton>
                    )}
                  </li>
                </ul>
              </div>

              {/* Close Button */}
              <Button
                onClick={toggleMobileMenu}
                className="fixed top-4 right-4 p-2 text-gray-500 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;