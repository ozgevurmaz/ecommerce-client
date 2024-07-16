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
      console.log("0")
      const res = await fetch("/api/users", {
        method: "GET",
      });
      console.log("1")
      const data = await res.json();
      console.log("2")
      setSignedInUser(data);
      setIsLike(data.wishlist.includes(product._id));
      setIsLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user || !signedInUser) {
      console.log("getuser")
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
    <Button onClick={handleLike}>
      <Heart className="text-red-600" fill={isLike ? "red" : "white"} />
    </Button>
  );
};

export default AddToWishlist;
