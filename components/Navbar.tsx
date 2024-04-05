import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronDown, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky flexBetween top-0 z-10 bg-white px-10 py-6">
      <Link href="/">
        <Image src="/StylieLogo.png" alt="StylieLogo" width={150} height={70} />
      </Link>

      <nav className="flexCenter gap-7">
        <Link href="/">Home</Link>
        <Link href="/" className="flexCenter">
          Shop
          <span className="text-gray-700 ">
            <ChevronDown size={16} />
          </span>
        </Link>
        <Link href="/">Sale</Link>
      </nav>

      <div>
        <Link href="/cart" className="relative">
          <ShoppingBag />
          <div className="absolute top-[-5px] right-[-5px] bg-black  px-1 rounded-full">
          <p className="text-small-medium text-white">0</p>
          </div></Link>
      </div>
    </div>
  );
};

export default Navbar;
