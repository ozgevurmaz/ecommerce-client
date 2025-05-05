"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Heart, ShoppingBag, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { categories } from "@/lib/constants";

const Footer = () => {
    const { user } = useUser();
    const [email, setEmail] = useState("");

    const quickLinks = [
        { name: "My Account", href: user ? "/profile" : "/sign-in", icon: <User className="w-4 h-4" /> },
        { name: "Shopping Bag", href: "/cart", icon: <ShoppingBag className="w-4 h-4" /> },
        { name: "Wishlist", href: user ? "/wishlist" : "/sign-in", icon: <Heart className="w-4 h-4" /> },
        { name: "Orders", href: user ? "/orders" : "/sign-in", icon: <ShoppingBag className="w-4 h-4" /> }
    ];

    const helpLinks = [
        { name: "Customer Service", href: "/help/customer-service" },
        { name: "Track Order", href: "/help/track-order" },
        { name: "Returns & Exchanges", href: "/help/returns" },
        { name: "Shipping Info", href: "/help/shipping" },
        { name: "Size Guide", href: "/help/size-guide" }
    ];

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter signup submitted with email:", email);
        setEmail("");
    };

    return (
        <footer className="border-t border-gray-200">
            <div className="bg-gray-300 py-10">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-semibold text-grey mb-2">Join Our Newsletter</h3>
                        <p className="text-grey/80 mb-6">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                required
                                className="rounded-l-full border-grey/20 focus-visible:ring-orange pl-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                className="bg-orange hover:bg-orange/90 text-white rounded-r-full"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-white py-10">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="flex flex-col">
                            <Link href="/" className="mb-6">
                                <Image
                                    src="/StylieLogo.png"
                                    alt="StylieLogo"
                                    width={150}
                                    height={70}
                                    style={{ height: "auto" }}
                                />
                            </Link>
                            <p className="text-grey/80 mb-6">
                                Discover modern and sophisticated fashion for the contemporary woman. From clothing to accessories, find your personal style with Stylie.
                            </p>
                            <div className="flex space-x-3 mb-6">
                                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <div className="w-9 h-9 rounded-full bg-nude hover:bg-orange transition-colors duration-300 flexCenter text-grey hover:text-white">
                                        <Instagram size={18} />
                                    </div>
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <div className="w-9 h-9 rounded-full bg-nude hover:bg-orange transition-colors duration-300 flexCenter text-grey hover:text-white">
                                        <Facebook size={18} />
                                    </div>
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <div className="w-9 h-9 rounded-full bg-nude hover:bg-orange transition-colors duration-300 flexCenter text-grey hover:text-white">
                                        <Twitter size={18} />
                                    </div>
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <div className="w-9 h-9 rounded-full bg-nude hover:bg-orange transition-colors duration-300 flexCenter text-grey hover:text-white">
                                        <Youtube size={18} />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Shop Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-grey">
                                <span className="border-b-2 border-orange pb-1">Shop</span>
                            </h3>
                            <ul className="space-y-3">
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            href={category.href}
                                            className="text-grey/80 hover:text-orange transition-colors duration-200"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-grey">
                                <span className="border-b-2 border-orange pb-1">My Account</span>
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-grey/80 hover:text-orange transition-colors duration-200 flex items-center"
                                        >
                                            <span className="mr-2 text-orange">{link.icon}</span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-lg font-semibold mt-8 mb-4 text-grey">
                                <span className="border-b-2 border-orange pb-1">Help</span>
                            </h3>
                            <ul className="space-y-3">
                                {helpLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href="/"
                                            className="text-grey/80 hover:text-orange transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-grey">
                                <span className="border-b-2 border-orange pb-1">Contact Us</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <MapPin className="mr-3 h-5 w-5 text-orange flex-shrink-0 mt-1" />
                                    <p className="text-grey/80">Fashion Avenue, Style District</p>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-3 h-5 w-5 text-orange flex-shrink-0" />
                                    <p className="text-grey/80">+1 (111) 111-1111</p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-3 h-5 w-5 text-orange flex-shrink-0" />
                                    <p className="text-grey/80">contact@stylie.com</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-grey py-4">
                <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-white/80 mb-2 md:mb-0">
                        © {new Date().getFullYear()} Stylie. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <Link href="/privacy-policy" className="text-sm text-white/80 hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-sm text-white/80 hover:text-white">
                            Terms of Service
                        </Link>
                        <Link href="/cookie-policy" className="text-sm text-white/80 hover:text-white">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;