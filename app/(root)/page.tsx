import BannerCarousel from "@/components/home/banner";
import Collections from "@/components/Collections";
import ProductList from "@/components/products/ProductList";

export default function Home() {
  return (
    <main>
      <BannerCarousel />
      <Collections />
      <ProductList />
    </main>
  );
}
