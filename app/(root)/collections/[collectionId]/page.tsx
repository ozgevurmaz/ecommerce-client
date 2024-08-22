import ProductCard from "@/components/products/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);
console.log(collectionDetails)
  return (
    <div className="px-10 py-5 text-grey flexCenter flex-col gap-5">
      <img
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl object-top"
      />
      <h3 className="text-heading3-bold">{collectionDetails.title}</h3>
      <p className="text-body-normal text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap justify-start gap-10">
        {collectionDetails.products.length > 0 && collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";