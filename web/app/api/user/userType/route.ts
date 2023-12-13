import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import primsa from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const { userType } = await req.json();
    const updatedUser = await prisma?.user.update({
      where: { id: user.id },
      data: {
        userType,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("USER_TYPE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
