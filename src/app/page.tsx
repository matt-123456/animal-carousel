"use client";

import useSWR from "swr";
import { CarouselDataLoader } from "@/components/CarouselDataLoader";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/helpers";
import Loading from "./loading";

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedCategories([data[0]]);
    }
  }, [data]);

  const handleCategorySelection = (category: Category) => {
    if (selectedCategories.find((c) => c.id === category.id)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  if (error) return <div>Something went wrong</div>;
  if (isLoading) return <Loading />;

  return (
    <main className="flex flex-col min-h-screen p-24 justify-between items-center">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {data.map((category: Category) => (
          <CategoryButton
            key={category.id}
            category={category}
            selected={selectedCategories.find((c) => c.id === category.id)}
            onClick={handleCategorySelection}
          />
        ))}
      </div>

      {data && selectedCategories.length > 0 && (
        <CarouselDataLoader
          category_ids={selectedCategories.map((c) => c.id)}
        />
      )}
    </main>
  );
}

interface CategoryButtonProps {
  category: Category;
  selected: Category | undefined;
  onClick: (category: Category) => void;
}

function CategoryButton({ category, selected, onClick }: CategoryButtonProps) {
  return (
    <button
      className={`inline-block px-4 py-3 ${
        selected ? "text-white bg-blue-600" : "text-blue-600 bg-white"
      } rounded-lg mr-2 capitalize`}
      key={category.id}
      onClick={() => onClick(category)}
    >
      {category.name}
    </button>
  );
}
