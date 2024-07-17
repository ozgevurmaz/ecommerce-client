"use client";

import React, { useState } from "react";
import StarRates from "@/components/functionalUi/StarRates";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddToWishlist from "@/components/functionalUi/AddToWishlist";

import useCart from "@/lib/hooks/useCart";
import Quantity from "@/components/functionalUi/Quantity";
import toast from "react-hot-toast";

const ProductInfo = ({ productDetails }: { productDetails: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    `${productDetails.colors.length === 1 ? productDetails.colors[0] : ""}`
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    `${productDetails.sizes.length === 1 ? productDetails.sizes[0] : ""}`
  );

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const cart = useCart();

  return (
    <div className="space-y-4">
      <div className="flexBetween">
        <div>
          <h3 className="text-heading3-bold">{productDetails.title}</h3>
          <StarRates />
        </div>
        <AddToWishlist product={productDetails} />
      </div>

      <div className="flexStart gap-3">
        <p className="text-base-medium text-gray-500">Category</p>
        <p className="text-base-bold">{productDetails.category}</p>
      </div>

      <p className="text-heading3-bold">€{productDetails.price}</p>

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
      {productDetails.sizes.length > 0 && (
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
      )}
      <p className="text-body-bold">Quantity:</p>
      <Quantity onQuantityChange={handleQuantityChange} />

      <Button
        variant={"secondary"}
        className="w-full bg-orange text-white"
        onClick={() => {
          if (selectedSize)
            cart.addItem({
              item: productDetails,
              quantity: quantity,
              color: selectedColor,
              size: selectedSize,
            });
        }}
      >
        Add To Card
      </Button>
    </div>
  );
};

export default ProductInfo;
