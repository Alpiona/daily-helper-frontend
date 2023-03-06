import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.email === "admin@example.com") {
    res.status(200).json({ token: "123", email: req.body.email });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
}
