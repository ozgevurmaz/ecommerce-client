import Gallery from "@/components/products/Gallery";
import ProductCard from "@/components/products/ProductCard";
import ProductInfo from "@/components/products/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);
  return (
    <>
      <div className="flexAlignStart gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery media={productDetails.media} />
        <ProductInfo productDetails={productDetails} />
      </div>

      <div className="flexCenter flex-col py-5 px-10">
        <h3 className="text-heading3-bold">Related Products</h3>
        <div className="flex flex-wrap gap-10 mt-8 mx-auto">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
export const dynamic = "force-dynamic";