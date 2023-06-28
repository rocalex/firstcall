import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */: {
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    case "PUT" /* Edit a model by its ID */: {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { firstName: req.body.firstName, lastName: req.body.lastName },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    case "DELETE" /* Delete a model by its ID */: {
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    default:
      res.status(400).json({ success: false });
      break;
  }
}
