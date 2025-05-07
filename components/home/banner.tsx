"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";

import { getCollections } from "@/lib/actions/actions";
import Loader from "../Loader";

const BannerCarousel = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCollectionsInfo = async () => {
    const res = await getCollections();
    setCollections(res);
    setLoading(false);
  };

  useEffect(() => {
    getCollectionsInfo();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
    
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const renderPaginationDots = () => {
    if (!collections || collections.length === 0) return null;

    return (
      <div className="flex justify-center gap-2 mt-4">
        {collections.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-orange w-6" : "bg-gray-300"
            }`}
            onClick={() => {
              if (api) {
                api.scrollTo(index);
                setActiveIndex(index);
              }
            }}
          />
        ))}
      </div>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full relative">
      <Carousel
        className="w-full max-w-screen-xl mx-auto"
        setApi={setApi}
        plugins={[autoplayRef.current]}
        onMouseEnter={() => {
          try {
            if (autoplayRef.current) {
              (autoplayRef.current as any).stop();
            }
          } catch (e) {
            console.error("Failed to stop autoplay", e);
          }
        }}
        onMouseLeave={() => {
          try {
            if (autoplayRef.current) {
              (autoplayRef.current as any).reset();
            }
          } catch (e) {
            console.error("Failed to reset autoplay", e);
          }
        }}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {collections && collections.length > 0 &&
            collections.map((collection, index) => (
              <CarouselItem key={collection._id} className="h-[500px] md:h-[500px] lg:h-[600px]">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black/5 md:bg-transparent z-10" />
                    <Image
                      src={collection.image}
                      fill
                      alt={collection.title}
                      className="object-cover transition-transform duration-400 flex z-[-10] opacity-70 md:opacity-100"
                      priority={index === 0}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full w-full flex flex-col md:flex-row">
                    {index === activeIndex && (
                      <motion.div
                        className="relative z-20 w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12"
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                      >
                        <motion.div variants={textVariants} className="mb-2">
                          <span className="inline-block px-4 py-1 bg-orange/10 text-orange text-sm font-medium rounded-full mb-4">
                            {collection.season || "New Collection"}
                          </span>
                        </motion.div>

                        <motion.h1
                          variants={textVariants}
                          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
                        >
                          {collection.title}
                        </motion.h1>

                        <motion.p
                          variants={textVariants}
                          className="text-base md:text-lg text-gray-700 mb-8 max-w-md"
                        >
                          {collection.description}
                        </motion.p>

                        <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4">
                          <Button
                            asChild
                            className="bg-orange hover:bg-orange/90 text-white border-none px-8 py-3 rounded-full text-base font-medium"
                          >
                            <Link href={`/collection/${collection.slug}`}>
                              Shop Now
                            </Link>
                          </Button>

                          <Button
                            asChild
                            className="border border-gray-300 hover:border-orange hover:text-orange text-gray-700 px-8 py-3 rounded-full text-base font-medium bg-white/80"
                          >
                            <Link href="/collections">
                              Explore All
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Custom carousel controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <CarouselPrevious className="h-10 w-10 rounded-full bg-white/70 hover:bg-white text-gray-800 border-none shadow-md" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          <CarouselNext className="h-10 w-10 rounded-full bg-white/70 hover:bg-white text-gray-800 border-none shadow-md" />
        </div>

        <div className="absolute bottom-6 left-0 right-0">
          {renderPaginationDots()}
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;