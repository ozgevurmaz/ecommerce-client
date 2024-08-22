"use client";
import ProductCard from "@/components/products/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (error) {
      console.error("[users_GET]", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);
    if (!signedInUser) return;

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    getWishlistProducts();
  }, [signedInUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <h3 className="text-heading3-bold my-10">Your Wishlist</h3>
      {wishlist.length === 0 ? (
        <p className="text-body-bold my-10">No products in your wishlist.</p>
      ) : (
        <div className="flexStart flex-wrap gap-3">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
export const dynamic = "force-dynamic";