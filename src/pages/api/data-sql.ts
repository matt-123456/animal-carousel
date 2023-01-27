import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@planetscale/database";

const config = {
  url: process.env.DATABASE_URL,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const conn = connect(config);

  const query = `
    SELECT a.id,
           a.category as name,
           GROUP_CONCAT(b.photo_url SEPARATOR ',') as images
    FROM animal_categories a
    LEFT JOIN animal_photos b ON a.id = b.category_id
    GROUP BY a.id
  `;

  const results = await conn.execute(query, { as: "object" });

  const data = results.rows.map((row) => {
    // @ts-ignore
    row = { ...row, images: row.images.split(",") };
    return row;
  });

  return res.status(200).json(data);
}
