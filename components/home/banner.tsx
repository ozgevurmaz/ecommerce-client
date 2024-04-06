import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { bannerInfos } from "@/lib/constants";
import Image from "next/image";
import { Button } from "../ui/button";

const BannerCarousel = () => {
  return (
    <div className="w-full h-[600] bg-gray-300 flexCenter">
      <Carousel className="w-9/12">
        <CarouselContent>
          {bannerInfos.map((banner) => (
            <CarouselItem key={banner.url} className="flexAround">
              <div className="w-[30%] text-center" >
                <h1 className="text-heading1-bold leading-[5rem]">{banner.header}</h1>
                <p className="text-base-medium mt-5">{banner.paragraph}</p>
                <Button className="rounded-xl bg-black text-white px-5 hover:scale-110 mt-10" >Expore Now</Button>
              </div>
              <Image src={banner.url} width={600} height={600} alt="banner" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
