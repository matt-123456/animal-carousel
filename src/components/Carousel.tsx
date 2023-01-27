"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type CarouselProps = {
  items: string[];
};

export function Carousel({ items }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleNextImage = useCallback(() => {
    const nextImageIndex = (currentImageIndex + 1) % items.length;
    setCurrentImageIndex(nextImageIndex);
  }, [currentImageIndex, items.length]);

  const handlePreviousImage = useCallback(() => {
    let previousImageIndex = currentImageIndex - 1;
    if (previousImageIndex < 0) {
      previousImageIndex = items.length - 1;
    }
    setCurrentImageIndex(previousImageIndex);
  }, [currentImageIndex, items.length]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    },
    [handlePreviousImage, handleNextImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!items || items.length === 0) {
    return <div>No images for this category</div>;
  }

  return (
    <div className="flex">
      <button onClick={handlePreviousImage}>
        <ChevronLeftIcon className="h-20 w-20" />
      </button>

      <Image
        style={{ objectFit: "cover", borderRadius: 50 }}
        src={items[currentImageIndex]}
        alt={items[currentImageIndex]}
        width={750}
        height={500}
        priority={true}
      />
      <button onClick={handleNextImage}>
        <ChevronRightIcon className="h-20 w-20" />
      </button>
    </div>
  );
}
