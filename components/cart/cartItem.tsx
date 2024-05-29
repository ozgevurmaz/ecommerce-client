"use client";

import React, { useEffect, useState } from "react";
import Quantity from "../functionalUi/Quantity";
import useCart from "@/lib/hooks/useCart";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

interface CartItemProps {
  productInfo: ProductType;
  quantity: number;
  size?: string;
  color?: string;
  cartPage?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  productInfo,
  quantity,
  size,
  color,
  cartPage,
}) => {
  const [quantityCount, setQuantityCount] = useState<number>(quantity);
  const handleQuantityChange = (quantity: number) => {
    setQuantityCount(quantity);
  };

  useEffect(() => {
    cart.updateQuantity(productInfo._id, quantityCount);
  }, [quantityCount]);

  const cart = useCart();

  return (
    <div className="w-full flexBetween gap-2 lg:gap-12">
      <img
        src={productInfo.media[0]}
        alt={productInfo.title}
        width={300}
        height={300}
        className="w-20 h-20 lg:w-32 lg:h-32 object-cover"
      />
      <div className="flex flex-col gap-1 md:gap-12 md:flex-row">
        {size && <p className="text-body-small">Size: {size}</p>}
        {color && <p className="text-body-small">Color: {color}</p>}
        <Quantity
          onQuantityChange={handleQuantityChange}
          quantityCount={quantity}
        />
        <p className="text-body-bold">${productInfo.price}</p>
      </div>

      <Button
        onClick={() => cart.removeItem(productInfo._id)}
        className="text-red-500"
      >
        <Trash />
      </Button>
    </div>
  );
};

export default CartItem;
