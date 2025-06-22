import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-heading2-bold text-foreground mb-4">
            New Arrivals
          </h2>
          <p className="text-body-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the latest additions to our collection that you'll never want to take off
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {products &&
            products
              .slice(0, 4)
              .map((product: ProductType) => (
                <div 
                  key={product._id}
                  className="group"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            asChild 
            className="border bg-background hover:bg-primary hover:text-primary-foreground border-foreground hover:border-primary px-6 py-4 text-base-bold rounded-full transition-all duration-300 hover:scale-[1.02]"
          >
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;