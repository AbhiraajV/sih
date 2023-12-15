import EmailTemplate from "@/components/email-template/EmailTemplate";
import { Tender } from "@prisma/client";
import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  const { id } = (await req.json()) as Tender;
  const productsTenderTable = await prisma?.tenderProductCategory.findMany({
    where: { tenderId: id },
  });
  const allProductIds = productsTenderTable?.map(
    (product) => product.productId
  );
  const products = await prisma?.product.findMany({
    where: {
      id: { in: allProductIds },
    },
  });
  const users = await prisma?.user.findMany({
    where: {
      AND: {
        userType: "Vendor",
        products: {
          some: {
            productId: { in: allProductIds },
          },
        },
      },
    },
  });
  if (!users) return NextResponse.json("No users found");

  try {
    const data = await resend.emails.send({
      from: "NEEPCO Vendor Support <onboarding@resend.dev>",
      to: users!.map((user) => user.email),
      subject: "New Tender you can Apply to!! 🚀",
      react: EmailTemplate({ products }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
