"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import React, { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flexStart flex-col gap-5 mt-14">
      <h4 className="text-heading4-bold text-orange">Successful Payment</h4>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
