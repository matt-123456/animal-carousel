import { NextApiRequest, NextApiResponse } from "next";
import { generateJwtToken } from "@/lib/authService";

type AuthResponse = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  const token = await generateJwtToken();
  res.status(200).json({ token });
}
