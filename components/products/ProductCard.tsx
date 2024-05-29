"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import AddToWishlist from "../functionalUi/AddToWishlist";
import StarRates from "../functionalUi/StarRates";
import { Button } from "../ui/button";

const ProductCard = ({ product }: { product: ProductType }) => {

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link
      href={`/products/${product._id}`}
      className="rounded-lg shadow-lg hover:scale-105 "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative">
        <Image
          src={product.media[0]}
          alt="product"
          width={260}
          height={300}
          className="h-[330px] rounded-lg object-cover "
        />
        <Button
          variant="primary"
          className={`w-full z-20 absolute bottom-3 ${isHover ? "" : "hidden"}`}
        >
          Add To Card
        </Button>
      </div>
      <div className="p-2">
        <p className="text-body-bold">{product.title}</p>
        <p className="text-small-medium text-gray-700">{product.category}</p>

        <StarRates />
        <div className="flexBetween">
          <p className="text-body-bold">${product.price}</p>
          <AddToWishlist id={product._id} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
