// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

type Data = {
  success: boolean;
  data?: Array<{
    username: string;
    firstName: string;
    lastName: string;
  }>;
  errors?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    }
    case "POST": {
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (e: any) {
        if (e.name == "MongoServerError" && e.code == 11000) {
          res.status(400).json({
            success: false,
            errors: {
              username: {
                name: "ValidationError",
                message: "Username must be unique",
              },
            },
          });
        } else {
          res.status(400).json({ success: false, errors: e.errors });
        }
      }
      break;
    }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
