"use client";

import React, { useState } from "react";
import StarRates from "@/components/StarRates";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, MinusCircle, PlusCircle } from "lucide-react";
import AddToWishlist from "./AddToWishlist";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productDetails }: { productDetails: ProductType }) => {
  console.log(productDetails.sizes);

  const [selectedColor, setSelectedColor] = useState<string>(
    `${productDetails.colors.length === 1 ? productDetails.colors[0] : ""}`
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    `${productDetails.sizes.length === 1 ? productDetails.sizes[0] : ""}`
  );
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    if (quantity === 99) {
      // Change 99 with stock quantity
      setQuantity(99);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const cart = useCart();

  return (
    <div className="space-y-4">
      <div className="flexBetween">
        <div>
          <h3 className="text-heading3-bold">{productDetails.title}</h3>
          <StarRates />
        </div>
        <AddToWishlist id={productDetails._id} />
      </div>

      <div className="flexStart gap-3">
        <p className="text-base-medium text-gray-500">Category</p>
        <p className="text-base-bold">{productDetails.category}</p>
      </div>

      <p className="text-heading3-bold">${productDetails.price}</p>

      <Separator className="my-4 bg-gray-300 mt-4" />

      <div className="w-96 h-max-64 tailwind-scrollbar-hide space-y-2">
        <p className="text-base-medium text-gray-500">Details</p>
        <p className="text-base-bold">{productDetails.description}</p>
      </div>

      {productDetails.colors.length > 0 && (
        <div className="flex flex-col gap-2 space-y-2">
          <p className="text-base-medium text-gray-500">Colors</p>
          <div className="flex gap-2">
            {productDetails.colors.map((color, index) => (
              <p
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  color === selectedColor ? "bg-slate-300" : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-gray-500">Sizes</p>
        <div className="flex gap-2">
          {productDetails.sizes.map((size, index) => (
            <p
              className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                size === selectedSize ? "bg-slate-300" : ""
              }`}
              key={index}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <p className="text-body-bold">Quantity:</p>
      <div className="flexStart gap-3">
        <MinusCircle
          className="hover:text-red-500 cursor-pointer"
          onClick={() => decreaseQuantity()}
        />

        <input
          type="number"
          value={quantity}
          className="w-[30px] text-center"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,2}$/.test(value)) {
              // only integer values
              setQuantity(Number(value));
            }
          }}
        />

        <PlusCircle
          className="hover:text-red-500 cursor-pointer"
          onClick={() => increaseQuantity()}
        />
      </div>

      <Button
        variant={"secondary"}
        className="w-full bg-orange text-white"
        onClick={() =>
          cart.addItem({
            item: productDetails,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
          })
        }
      >
        Add To Card
      </Button>
    </div>
  );
};

export default ProductInfo;
