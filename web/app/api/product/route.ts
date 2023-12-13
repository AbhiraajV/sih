import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({});
    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.log("PAYMENT", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
