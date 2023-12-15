import { currentProfile } from "@/lib/current-profile";
import { connectUserToProduct } from "@/lib/functionsPrisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const { productType } = await req.json();
    console.log({ productType });
    const updatedUser = await connectUserToProduct(user, productType);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("VENDOR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
