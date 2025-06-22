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
        <footer className="border-y border-border bg-background">
            {/* Newsletter Section */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h3 className="text-heading3-bold text-foreground">
                            Join Our Newsletter
                        </h3>
                        <p className="text-base-medium text-muted-foreground leading-relaxed">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                required
                                className="flex-1 px-4 py-3 rounded-l-full sm:rounded-r-none rounded-r-full bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="secondary"
                                className="h-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-full sm:rounded-l-none rounded-l-full px-8 py-3 text-base-bold transition-all duration-300 hover:scale-[1.02]"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-muted py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="inline-block mb-6">
                                <Image
                                    src="/StylieLogo.png"
                                    alt="Stylie Logo"
                                    width={150}
                                    height={70}
                                    className="h-auto"
                                />
                            </Link>
                            <p className="text-base-medium text-muted-foreground mb-6 leading-relaxed">
                                Discover modern and sophisticated fashion for the contemporary woman. From clothing to accessories, find your personal style with Stylie.
                            </p>
                            <div className="flex space-x-3">
                                <a 
                                    href="https://instagram.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Follow us on Instagram"
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-primary-foreground group hover:scale-110"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a 
                                    href="https://facebook.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Follow us on Facebook"
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-primary-foreground group hover:scale-110"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a 
                                    href="https://twitter.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Follow us on Twitter"
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-primary-foreground group hover:scale-110"
                                >
                                    <Twitter size={18} />
                                </a>
                                <a 
                                    href="https://youtube.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Watch us on YouTube"
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-primary-foreground group hover:scale-110"
                                >
                                    <Youtube size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Shop Links */}
                        <div>
                            <h3 className="text-body-bold text-foreground mb-6 relative">
                                <span className="border-b-2 border-primary pb-1">Shop</span>
                            </h3>
                            <ul className="space-y-3">
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            href={category.href}
                                            className="text-base-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-body-bold text-foreground mb-6 relative">
                                <span className="border-b-2 border-primary pb-1">My Account</span>
                            </h3>
                            <ul className="space-y-3 mb-8">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-base-medium text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                                        >
                                            <span className="mr-2 text-primary group-hover:scale-110 transition-transform duration-300">
                                                {link.icon}
                                            </span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-body-bold text-foreground mb-6 relative">
                                <span className="border-b-2 border-primary pb-1">Help</span>
                            </h3>
                            <ul className="space-y-3">
                                {helpLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-base-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-body-bold text-foreground mb-6 relative">
                                <span className="border-b-2 border-primary pb-1">Contact Us</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start group">
                                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                                    <p className="text-base-medium text-muted-foreground">
                                        Fashion Avenue, Style District<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                                <div className="flex items-center group">
                                    <Phone className="mr-3 h-5 w-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <a 
                                        href="tel:+11111111111" 
                                        className="text-base-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        +1 (111) 111-1111
                                    </a>
                                </div>
                                <div className="flex items-center group">
                                    <Mail className="mr-3 h-5 w-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <a 
                                        href="mailto:contact@stylie.com" 
                                        className="text-base-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        contact@stylie.com
                                    </a>
                                </div>
                            </div>

                            {/* Store Hours */}
                            <div className="mt-8">
                                <h4 className="text-base-bold text-foreground mb-3">Store Hours</h4>
                                <div className="space-y-1 text-small-medium text-muted-foreground">
                                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-card border-t border-border py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-small-medium text-muted-foreground mb-4 md:mb-0">
                        © {new Date().getFullYear()} Stylie. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link 
                            href="/privacy-policy" 
                            className="text-small-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href="/terms-of-service" 
                            className="text-small-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            Terms of Service
                        </Link>
                        <Link 
                            href="/cookie-policy" 
                            className="text-small-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;