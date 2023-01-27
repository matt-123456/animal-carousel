import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const animalPhotos = await prisma.animal_photos.findMany({
    select: {
      photo_url: true,
    },
    where: {
      category_id: Number(req.query.id),
    },
  });

  if (!animalPhotos) {
    return res.status(404).json({
      error: "No photos found",
    });
  }

  const data = animalPhotos.map((row) => {
    return row.photo_url;
  });

  return res.status(200).json(data);
}
