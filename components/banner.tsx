"use client";
import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";

import { bannerInfos } from "@/lib/constants";

const BannerCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <div className="w-full h-[600] bg-gray-300 flexCenter">
      <Carousel
        className="w-9/12"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerInfos.map((banner) => (
            <CarouselItem key={banner.url} className="flexAround">
              <div className="w-[30%] text-center py-3">
                <h1 className="text-heading1-bold leading-[5rem]">
                  {banner.header}
                </h1>
                <p className="text-base-medium mt-5">{banner.paragraph}</p>
                <Button className="px-5 mt-8" variant={"primary"}>
                  Expore Now
                </Button>
              </div>
              <Image src={banner.url} width={600} height={600} alt="banner" className="hover:scale-105 transition-all duration-400 flex z-[-10] opacity-50 md:opacity-100" />
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
