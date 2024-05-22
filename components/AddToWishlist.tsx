"use client";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddToWishlist = ({ id }: { id: string }) => {
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [signedInUser, setSignInUser] = useState<UserType | null>(null);
  const [isLike, setIsLike] = useState(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignInUser(data);
      setIsLike(data.wishlist.includes(id));
      setIsLoading(false);
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
        setIsLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: id }),
        });
        const updatedUser = await res.json();
        setSignInUser(updatedUser);
        setIsLike(updatedUser.wishlist.includes(id));
        setIsLoading(false);
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };

  return (
    <Button onClick={handleLike} variant={"icon"}>
      <Heart className="text-red-600" fill={isLike ? "red" : "white"} />
    </Button>
  );
};

export default AddToWishlist;
