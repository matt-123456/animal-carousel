import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const animalCategories = await prisma.animal_categories.findMany({
    select: {
      id: true,
      category: true,
    },
  });

  if (!animalCategories) {
    return res.status(404).json({
      error: "No animal category found",
    });
  }

  const data = animalCategories.map((row) => {
    return {
      id: row.id,
      name: row.category,
    };
  });

  return res.status(200).json(data);
}
