"use client";

import Image from "next/image";
import React, { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const Gallery = ({ media }: { media: string[] }) => {
  const [mainMediaIndex, setMainMediaIndex] = useState(0);

  const handleBackClick = () => {
    if (mainMediaIndex === 0) {
      setMainMediaIndex(media.length - 1);
    } else {
      setMainMediaIndex(mainMediaIndex - 1);
    }
  };

  const handleForwardClick = () => {
    if (mainMediaIndex === media.length - 1) {
      setMainMediaIndex(0);
    } else {
      setMainMediaIndex(mainMediaIndex + 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <div className="relative flexCenter">
        <Button
          variant={"icon"}
          className="z-5 absolute left-2 shadow-lg bg-white hover:text-orange"
          onClick={handleBackClick}
        >
          <ChevronLeft size={"28px"} />
        </Button>
        <Image
          src={media[mainMediaIndex]}
          width={500}
          height={500}
          alt="product"
          className="w-96 h-96 shadow-xl object-contain rounded-lg"
        />
        <Button
          variant={"icon"}
          className="z-5 absolute right-3 shadow-lg bg-white hover:text-orange"
          onClick={handleForwardClick}
        >
          <ChevronRight size={"28px"} />
        </Button>
      </div>
      <div className="flex gap-2 tailwind-scrollbar-hide">
        {media.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={200}
            height={200}
            alt="product"
            className="w-20 h-20 shadow-lg object-contain rounded-lg"
            onClick={() => setMainMediaIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
