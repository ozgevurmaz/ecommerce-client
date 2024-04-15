"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignInUser] = useState<UserType | null>(null);
  const [isLike, setIsLike] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignInUser(data);
      setIsLike(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setSignInUser(updatedUser);
        setIsLike(updatedUser.wishlist.includes(product._id));
        setLoading(false);
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="p-4 border rounded-lg shadow-lg space-y-3"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-contain hover:scale-105 transition-all duration-400"
      />
      <h5 className="text-heading5-bold">{product.title}</h5>
      <p>${product.price}</p>
      <div className="flexBetween">
        <Button className="bg-black text-white rounded-full">
          Add To Card
        </Button>
        <Button onClick={handleLike} className="shadow-none">
          <Heart className="text-red-600" fill={isLike ? "red" : "white"} />
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
