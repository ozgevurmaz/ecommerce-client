
import { getProducts } from "@/lib/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
    const products = await getProducts()

  return (
    <div className="w-[80%] mx-auto my-12">
      <h3 className="text-heading3-bold text-center">New Arrivals</h3>
      <p className="text-small-medium my-2 text-center">
        Find the new items in Stylie that you don't want to take it off.
      </p>
      <div className="flexCenter gap-5">
        {products && products.slice(0,4).map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
