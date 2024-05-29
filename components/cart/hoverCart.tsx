"use client";

import useCart from "@/lib/hooks/useCart";
import React from "react";
import CartItem from "./cartItem";
import { Button } from "../ui/button";
import router from "next/navigation";
import { Trash } from "lucide-react";

const HoverCart = () => {
  const Cart = useCart();
  return (
    <div>
      <h5 className="text-heading5-bold">Cart</h5>
      <hr />
      {Cart.cartItems.length === 0 ? (
        <div className="flexAround flex-col gap-9 p-12">
          <p>No items in the cart.</p>
        </div>
      ) : (
        <div className="flexCenter flex-col">
          {Cart.cartItems.map((item) => (
            <div
              key={item.item._id}
              className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
            >
              <img
                src={item.item.media[0]}
                alt={item.item.title}
                width={100}
                height={100}
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-body-bold text-black mb-2">Price</p>
                <p className="text-body-medium">$ {item.item.price}</p>
              </div>
              <Button
                onClick={() => Cart.removeItem(item.item._id)}
                className="text-red-500"
              >
                <Trash />
              </Button>
            </div>
          ))}
          <Button className="bg-white text-black">
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default HoverCart;
