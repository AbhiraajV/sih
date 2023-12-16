import EmailTemplate from "@/components/email-template/EmailTemplate";
import { Tender } from "@prisma/client";
import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  const { id } = (await req.json()) as Tender;
  console.log({ id });
  const productsTenderTable = await prisma?.tenderProductCategory.findMany({
    where: { tenderId: id },
  });
  const allProductIds = productsTenderTable?.map(
    (product) => product.productId
  );
  console.log({ allProductIds });
  const products = await prisma?.product.findMany({
    where: {
      id: { in: allProductIds },
    },
  });
  console.log({ products });
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
  console.log({ users });
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
