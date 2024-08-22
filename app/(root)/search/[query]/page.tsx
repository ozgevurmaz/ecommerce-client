import ProductCard from "@/components/products/ProductCard";
import { getSearchResults } from "@/lib/actions/actions";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchResults(params.query);
  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 py-5">
      <h4 className="text-heading4-bold my-10">
        Search results for {decodedQuery}
      </h4>
      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <p className="text-body-bold text-center">No result found.</p>
        ))}
      <div className="flex flex-wrap justify-start gap-10">
        {searchedProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
export const dynamic = "force-dynamic";