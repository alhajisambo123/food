import mongoose from "mongoose";
import { MenuItem } from "@/models/MenuItem";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    return Response.json(await MenuItem.findById(_id));
  } else {
    return "No data found yet";
  }
}
