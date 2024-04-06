import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stylie Store",
  description: "Stylie Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <ClerkProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
