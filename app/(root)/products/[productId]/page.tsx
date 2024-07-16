import Gallery from "@/components/products/Gallery";
import ProductInfo from "@/components/products/ProductInfo";
import { getProductDetails } from "@/lib/actions/actions";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const productDetails = await getProductDetails(params.productId);
  return (
    <div className="flexAlignStart gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <Gallery media={productDetails.media} />
      <ProductInfo productDetails={productDetails} />
      </div>
  );
};

export default ProductDetail;
