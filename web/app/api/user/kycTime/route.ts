import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import primsa from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { kycTime, uid } = await req.json();
    const updatedUser = await prisma?.user.update({
      where: { id: uid },
      data: {
        kycTime,
        verified: "KYC_SCHEDULED",
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("USER_TYPE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
