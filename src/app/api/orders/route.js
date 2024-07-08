import { authOptions } from "@/app/api/authOptions/authOptions";
import { isAdmin } from "@/app/api/isAdmin/isAdmin/";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _idString = url.searchParams.get("_id");

    // Validate _id format
    if (!mongoose.Types.ObjectId.isValid(_idString)) {
      return new Response(JSON.stringify({ error: "Invalid order ID" }), {
        status: 400,
      }); // Bad Request
    }

    // Convert _id to Mongoose ObjectId
    const _id = new mongoose.Types.ObjectId(_idString); // Use correct method

    // Check for admin authorization (using a placeholder function)
    if (!(await isAdmin(req))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      }); // Forbidden
    }

    // Delete the order
    const deletedOrder = await Order.deleteOne({ _id });

    // Handle successful deletion
    if (deletedOrder.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Order deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Order not found" }), {
        status: 404,
      }); // Not Found
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    }); // Internal Server Error
  } finally {
    // Close Mongoose connection (optional, but good practice)
    await mongoose.disconnect();
  }
}

// Placeholder function for admin authorization (replace with your implementation)
