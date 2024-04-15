import BannerCarousel from "@/components/banner";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <main>
      <BannerCarousel />
      <Collections />
      <ProductList />
    </main>
  );
}
