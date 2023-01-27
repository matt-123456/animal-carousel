"use client";

import { arrayFetcher, shuffle } from "@/lib/helpers";
import useSWR from "swr";
import Loading from "@/app/loading";
import { Carousel } from "@/components/Carousel";

type CarouselWithDataManagerProps = {
  category_ids: number[];
};

export function CarouselDataLoader({
  category_ids,
}: CarouselWithDataManagerProps) {
  const categoriesWithUrls = category_ids.map(
    (id) => `/api/categories/${id}/photos`
  );

  const { data, error, isLoading } = useSWR(categoriesWithUrls, arrayFetcher);

  const imageUrls = data?.reduce((acc, curr) => acc.concat(curr), []) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {data && (
        <Carousel items={data.length > 1 ? shuffle(imageUrls) : imageUrls} />
      )}
    </div>
  );
}
