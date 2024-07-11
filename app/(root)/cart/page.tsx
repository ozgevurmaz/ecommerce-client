"use client";

import React, { useState } from "react";
import CartItem from "@/components/cart/cartItem";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Cart = () => {
  const { user } = useUser();
  const Cart = useCart();
  const router = useRouter();

  const total = Cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const cartLength = Cart.cartItems.length;

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    phone: user?.phoneNumbers[0].phoneNumber,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: JSON.stringify({ cartItems: Cart.cartItems, customer }),
          }),
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[CHECKOUT_POST]", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[90%] px-7 flex justify-start gap-2 md:gap-12 flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <h4 className="text-heading4-bold">Cart</h4>
          <hr />
          {Cart.cartItems.length === 0 ? (
            <div className="flexCenter flex-col gap-9 px-12">
              <p>No items in the cart.</p>
              <Button variant="primary" onClick={() => router.push("/")}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div>
              {Cart.cartItems.map((item) => (
                <div
                  key={item.item._id}
                  className="w-full flexCenter max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start"
                >
                  <CartItem
                    productInfo={item.item}
                    quantity={item.quantity}
                    size={item.size}
                    color={item.color}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {
          <div className="w-full h-56 lg:w-1/4 flex flex-col justify-center gap-8 bg-gray-200 rounded-lg px-4 py-5 ">
            <h5 className="text-heading5-bold">
              Total Price for {cartLength} {cartLength === 1 ? "item" : "items"}
            </h5>
            <p className="text-body-bold">€{totalRounded}</p>

            <button
              className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
              onClick={handleCheckout}
            >
              Buy Now
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
