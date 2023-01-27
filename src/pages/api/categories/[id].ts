import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const animalCategories = await prisma.animal_categories.findFirst({
    select: {
      id: true,
      category: true,
    },
    where: {
      id: Number(req.query.id),
    },
  });

  if (!animalCategories) {
    return res.status(404).json({
      error: "No animal category found",
    });
  }

  const data = {
    id: animalCategories.id as number,
    name: animalCategories.category as string,
  };

  return res.status(200).json(data);
}
