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
  X,
  ChevronDown
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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        {/* Top Navigation - Brand, Search, Account */}
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
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
              className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? "w-80" : "w-64"
                }`}
            >
              <input
                type="text"
                placeholder="Search for styles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-3 pl-4 pr-12 text-small-medium bg-background border border-input rounded-full outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-3 p-1 text-muted-foreground hover:text-primary transition-colors duration-200 disabled:opacity-50"
                disabled={!query.trim()}
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Icons Navigation */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Cart with Counter Badge */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className="bg-transparent hover:bg-accent transition-colors duration-200 p-2 lg:p-3 flex items-center gap-1 lg:gap-2 rounded-lg text-foreground"
                      aria-label="Shopping cart"
                    >
                      <div className="relative">
                        <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
                        {Cart.cartItems.length > 0 && (
                          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 text-xs font-bold text-primary-foreground bg-primary rounded-full shadow-md">
                            {Cart.cartItems.length}
                          </span>
                        )}
                      </div>
                      <span className="hidden lg:inline text-small-medium font-medium">Cart</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4 bg-background shadow-xl rounded-xl border border-border">
                        <HoverCart />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Wishlist */}
              <Link
                href={user ? "/wishlist" : "/sign-in"}
                className="relative p-2 lg:p-3 text-foreground hover:text-primary hover:bg-accent transition-all duration-200 flexCenter gap-1 lg:gap-2 rounded-lg group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" />
                <span className="hidden lg:inline text-small-medium font-medium">Wishlist</span>
              </Link>

              {/* Account */}
              {user ? (
                <div className="p-0">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger
                          className="bg-transparent hover:bg-accent transition-colors duration-200 p-2 lg:p-3 flexCenter gap-1 lg:gap-2 rounded-lg text-foreground"
                          aria-label="User account"
                        >
                          <User className="w-5 h-5 lg:w-6 lg:h-6 transition-transform hover:scale-110" />
                          <span className="hidden lg:inline text-small-medium font-medium">Profile</span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-48 p-2 bg-background shadow-xl rounded-xl border border-border">
                            <Link
                              href="/profile"
                              className="block px-4 py-3 text-small-medium text-foreground hover:bg-accent hover:text-primary rounded-lg transition-all duration-200"
                            >
                              My Profile
                            </Link>
                            <Link
                              href="/orders"
                              className="block px-4 py-3 text-small-medium text-foreground hover:bg-accent hover:text-primary rounded-lg transition-all duration-200"
                            >
                              Orders
                            </Link>
                            <SignOutButton>
                              <Button className="w-full text-left px-4 py-3 text-small-medium text-foreground hover:bg-accent hover:text-destructive rounded-lg transition-all duration-200 bg-transparent justify-start font-medium">
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
                  <Button className="p-2 lg:p-3 bg-transparent hover:bg-accent rounded-lg transition-all duration-200">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-foreground hover:text-primary transition-colors" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation - Hidden on mobile */}
        <nav className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center space-x-6 xl:space-x-8 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <li key={category.name} className="relative group">
                  <Link
                    href={category.href}
                    className="inline-block py-4 px-2 text-base-medium font-medium text-foreground hover:text-primary transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
                  >
                    {category.name}
                  </Link>

                  {/* Dropdown for subcategories */}
                  {category.subCategories && (
                    <div className="absolute left-0 mt-1 w-56 bg-background shadow-xl rounded-xl p-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-20 border border-border">
                      <ul className="space-y-1">
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory.name}>
                            <Link
                              href={subCategory.href}
                              className="block px-4 py-2 text-small-medium text-foreground hover:bg-accent hover:text-primary rounded-lg transition-all duration-200"
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

      {/* Tablet and Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 mx-4">
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <Image
              src="/StylieLogo.png"
              alt="Stylie"
              width={90}
              height={40}
              className="h-auto"
            />
          </Link>

          <div className="flex items-center space-x-2">

            {/* Cart Icon for Mobile */}
            <Link href="/cart" className="relative p-2 hover:bg-accent rounded-lg transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {Cart.cartItems.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-medium p-1 text-primary-foreground bg-primary rounded-full shadow-md">
                  {Cart.cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <Button
              onClick={toggleMobileMenu}
              className="p-2 bg-transparent hover:bg-accent text-foreground rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Form - Toggleable */}
        <div id="mobile-search-form" className="hidden px-4 pb-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for styles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 pl-4 pr-12 text-base-medium bg-background border border-input rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                disabled={!query.trim()}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile/Tablet Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background pt-16 lg:pt-20 h-screen">
            <div className="container px-4 md:px-6 pb-6 h-full overflow-y-auto">
              {/* Mobile Search - Always visible in menu */}
              <form onSubmit={handleSearch} className="mb-6 md:mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for styles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-3 pl-4 pr-12 text-base-medium bg-background border border-input rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                    disabled={!query.trim()}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-small-bold uppercase text-muted-foreground mb-3 md:mb-4 tracking-wider">Categories</h3>
                <ul className="space-y-1 md:space-y-2">
                  {categories.map((category) => (
                    <li key={category.name} className="py-1">
                      <div className="flex items-center justify-start">
                        <Link
                          href={category.href}
                          className="text-base md:text-body-medium font-medium text-foreground hover:text-primary transition-colors py-2"
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
                            className="text-muted-foreground hover:text-primary p-2 transition-colors"
                          >
                            <ChevronDown className="w-6 h-6 text-primary"/>
                          </button>
                        )}
                      </div>

                      {category.subCategories && (
                        <ul id={`mobile-subcategory-${category.name}`} className="mt-2 ml-4 hidden space-y-2 border-l-2 border-border pl-4">
                          {category.subCategories.map((subCategory) => (
                            <li key={subCategory.name}>
                              <Link
                                href={subCategory.href}
                                className="text-base-medium text-muted-foreground hover:text-primary block py-2 transition-colors"
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
                <h3 className="text-small-bold uppercase text-muted-foreground mb-4 tracking-wider">Account</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={user ? "/wishlist" : "/sign-in"}
                      className="flex items-center text-body-medium font-medium text-foreground hover:text-primary py-3 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      <Heart className="w-5 h-5 mr-3 text-primary" />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={user ? "/orders" : "/sign-in"}
                      className="flex items-center text-body-medium font-medium text-foreground hover:text-primary py-3 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center text-body-medium font-medium text-foreground hover:text-primary py-3 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <User className="w-5 h-5 mr-3" />
                        My Profile
                      </Link>
                    </li>
                  )}
                  <li>
                    {user ? (
                      <SignOutButton>
                        <Button className="flex items-center p-0 text-body-medium font-medium text-foreground hover:text-destructive hover:bg-transparent py-3 transition-colors">
                          <User className="w-5 h-5 mr-3" />
                          Sign Out
                        </Button>
                      </SignOutButton>
                    ) : (
                      <SignInButton>
                        <Button className="flex items-center p-0 text-body-medium font-medium text-foreground hover:text-primary hover:bg-transparent py-3 transition-colors">
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
                className="fixed top-4 right-4 p-2 text-muted-foreground hover:text-foreground bg-transparent hover:bg-accent rounded-lg transition-colors"
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