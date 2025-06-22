"use client";

import { Heart } from "lucide-react";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface AddToWishlistProps {
  product: ProductType;
}

const AddToWishlist = ({ product }: AddToWishlistProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  const getUser = async () => {

    try {
      setIsLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      setSignedInUser(data);
      setIsLike(data.wishlist.includes(product._id));
      setIsLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user || !signedInUser) {
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
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLike(updatedUser.wishlist.includes(product._id));
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };

  return (
    <button className="bg-transparent hover:bg-transparent" onClick={handleLike}>
      <Heart size={25} className="text-primary" fill={isLike ? "red" : "white"} />
    </button>
  );
};

export default AddToWishlist;
