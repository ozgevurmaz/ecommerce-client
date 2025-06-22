"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

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
    Autoplay({ delay: 5000, stopOnInteraction: true })
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

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const renderPaginationDots = () => {
    if (!collections || collections.length === 0) return null;

    return (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm rounded-full px-4 py-2 border border-border/20">
          {collections.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 hover:scale-125 ${activeIndex === index
                ? "bg-primary w-4"
                : "bg-muted-foreground/40 w-1.5 hover:bg-muted-foreground/60"
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
      </div>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full relative bg-background">
      <Carousel
        className="w-full"
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
              <CarouselItem key={collection._id}>
                <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
                  {/* Image with subtle overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={collection.image}
                      fill
                      alt={collection.title}
                      className="object-cover transition-transform duration-[2000ms] hover:scale-[1.02]"
                      priority={index === 0}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="bg-foreground opacity-20 w-full h-full absolute" />
                    {index === activeIndex && (
                      <motion.div
                        className="relative z-20 max-w-2xl mx-auto px-8 md:px-16 lg:px-24"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div variants={itemVariants} className="mb-6">
                          <span className="inline-flex items-center scale-90 md:scale-100 px-4 py-2 bg-card/90 backdrop-blur-sm text-card-foreground text-small-medium rounded-full border border-border/20 shadow-sm">
                            {collection.season || "New Collection"}
                          </span>
                        </motion.div>

                        <motion.h1
                          variants={itemVariants}
                          className="text-heading2-bold md:text-heading1-bold text-background leading-[1.1] mb-6 tracking-tight"
                        >
                          {collection.title}
                        </motion.h1>

                        <motion.p
                          variants={itemVariants}
                          className="text-small-medium md:text-body-medium text-muted mb-10 max-w-lg leading-relaxed"
                        >
                          {collection.description}
                        </motion.p>

                        <motion.div
                          variants={itemVariants}
                          className="flex flex-col sm:flex-row gap-4 items-center"
                        >
                          <Button
                            asChild
                            className="max-w-min bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 lg:px-8 lg:py-6 text-small-bold md:text-base-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
                          >
                            <Link href={`/collection/${collection.slug}`}>
                              Shop Collection
                            </Link>
                          </Button>

                          <Button
                            asChild
                            className="max-w-min bg-background/80 backdrop-blur-sm text-foreground border-border hover:bg-background hover:text-foreground px-4 py-2 lg:px-8 lg:py-6 text-small-bold md:text-base-bold rounded-full transition-all duration-300 hover:scale-[1.02]"
                          >
                            <Link href="/collections">
                              View All Collections
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

        {/* Navigation arrows */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 z-30">
          <CarouselPrevious className="w-8 h-8 lg:h-12 lg:w-12 rounded-full bg-background/30 text-foreground border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-md" />
        </div>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 z-30">
          <CarouselNext className="w-8 h-8 lg:h-12 lg:w-12 rounded-full bg-background/30 text-foreground border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-md" />
        </div>

        {renderPaginationDots()}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;