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
    <div
      className="group h-full bg-card rounded-xl border border-border shadow-soft hover:shadow-warm transition-all duration-300 hover:scale-[1.02] overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.media[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Wishlist Button - Always visible on mobile, hover on desktop */}
        <div className="absolute top-3 right-3 z-20">
          <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <AddToWishlist product={product} />
          </div>
        </div>

        {/* Add to Cart Button - Slide up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 z-20 transform transition-all duration-300 ${isHover ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
          <div className="p-3">
            <Button
              size="lg"
              className="w-full border-0 rounded-lg text-small-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Sale Badge */}
        {product.tags?.includes('sale') && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-small-bold">
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <Link href={`/products/${product._id}`}>
        <div className="p-4 space-y-3">
          {/* Category */}
          <p className="text-small-medium text-muted-foreground uppercase tracking-wide">
            {product.category.title}
          </p>

          {/* Product Title */}
          <h3 className="text-base-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRates />
            <span className="text-small-medium text-muted-foreground">
              (24 reviews)
            </span>
          </div>

          {/* Price and Wishlist */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <>
                <span className="text-body-bold text-foreground">
                  €{product.price}
                </span>
              </>
            </div>

            {/* Mobile wishlist - visible on small screens */}
            <div className="md:hidden">
              <AddToWishlist product={product} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;