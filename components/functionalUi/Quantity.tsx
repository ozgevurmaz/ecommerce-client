"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface QuantityProps {
  onQuantityChange: (quantity: number) => void;
  quantityCount?: number;
}

const Quantity: React.FC<QuantityProps> = ({
  onQuantityChange,
  quantityCount,
}) => {
  const [quantity, setQuantity] = useState<number>(
    quantityCount ? quantityCount : 1
  );

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
      onQuantityChange(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center">
      <Button disabled={quantity === 1} onClick={decreaseQuantity} variant="small">
        <MinusCircle className="hover:text-red-500 cursor-pointer" />
      </Button>

      <input
        type="number"
        value={quantity}
        className="text-center w-[2rem]"
        onChange={handleQuantityChange}
      />

      <Button onClick={increaseQuantity} variant="small">
        <PlusCircle className="hover:text-red-500 cursor-pointer" />
      </Button>
    </div>
  );
};

export default Quantity;
