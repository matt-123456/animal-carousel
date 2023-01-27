import { Category } from "@/lib/shared-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;
    const categoryPromises = [];
    for (const categoryName in body) {
      const images = body[categoryName];
      categoryPromises.push(
        prisma.animal_categories.create({
          data: {
            category: categoryName,
            animal_photos: {
              create: images.map((image: string) => ({ photo_url: image })),
            },
          },
        })
      );
    }

    const categories = await Promise.all(categoryPromises);
    return res.status(200).json(
      categories.map((category) => ({
        id: category.id,
        name: category.category,
      }))
    );
  }

  const animalCategories = await prisma.animal_categories.findMany({
    select: {
      id: true,
      category: true,
      animal_photos: {
        select: {
          photo_url: true,
        },
      },
    },
  });

  const data = animalCategories.map((row): Category => {
    return {
      id: row.id as number,
      name: row.category as string,
      images: row.animal_photos.map((photo) => photo.photo_url) as string[],
    };
  });

  return res.status(200).json(data);
}
