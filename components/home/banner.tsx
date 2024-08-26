"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";

import { bannerInfos } from "@/lib/constants";
import { getCollections } from "@/lib/actions/actions";
import Loader from "../Loader";

const BannerCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );
  const [collections, setCollections] = useState<[CollectionType] | null>(null);
  const [loading, setLoading] = useState(true);
  const getCollectionsInfo = async () => {
    const res = await getCollections();
    setCollections(res);
    setLoading(false);
  };

  useEffect(() => {
    getCollectionsInfo();
  }, []);
  
  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-[600] bg-gray-300 flexCenter">
      <Carousel
        className="w-9/12"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {collections &&
            collections.map((banner: CollectionType) => (
              <CarouselItem key={banner._id} className="flexAround">
                <div className="w-[30%] text-center py-3 space-y-5">
                  <h1 className="text-heading1-bold leading-[5rem]">
                    {banner.title}
                  </h1>
                  <p className="text-base-medium">{banner.description}</p>
                  <Button className="mt-2" variant="primary">
                    Explore Now
                  </Button>
                </div>
                <Image
                  src={banner.image}
                  width={600}
                  height={600}
                  alt={banner.title}
                  className="hover:scale-105 transition-all duration-400 flex z-[-10] opacity-50 md:opacity-100"
                />
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
