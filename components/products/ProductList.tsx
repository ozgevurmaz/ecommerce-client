import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="w-[80%] mx-auto my-12">
      <h3 className="text-heading3-bold text-center">New Arrivals</h3>
      <p className="text-small-medium my-2 text-center">
        Find the new items in Stylie that you do not want to take it off.
      </p>
      <div className="flexCenter gap-2 lg:hidden max-md:flex-col">
        {products &&
          products
            .slice(0, 4)
            .map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      <div className="hidden lg:flexCenter gap-2 lg:gap-3 max-md:flex-col">
        {products &&
          products
            .slice(0, 5)
            .map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductList;
