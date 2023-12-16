import { NextResponse } from "next/server";
import primsa from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();
    const updatedUser = await prisma?.user.update({
      where: { id: uid },
      data: {
        verified: "TRUE",
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("USER_TYPE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
