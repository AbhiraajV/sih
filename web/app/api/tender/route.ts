import { currentProfile } from "@/lib/current-profile";
import { connectUserToProduct } from "@/lib/functionsPrisma";
import { Product, ProductProductCategory, Tender } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const { GemBidDocument, TenderInformationDoc, userId, id } =
      (await req.json()) as Tender & {
        productCategoriesToConnect: ProductProductCategory[];
      };

    const createdTender = await prisma.tender.create({
      data: {
        TenderInformationDoc,
        GemBidDocument,
        userId,
      },
      include: {
        createdBy: true,
        productCategories: true, // Include associated productCategories in the response
      },
    });

    return NextResponse.json(createdTender);
  } catch (error) {
    console.log("TENDER", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const {
      BidEndDate,
      BidNumber,
      BidStartDate,
      BidderYox,
      DocumentsRequiredFromBidder,
      MinAvgAnTurnover,
      Ministry,
      MseExemptionOnTurnoverAndYox,
      OfficeName,
      Organisation,
      Quantity,
      TenderInformation,
      GemBidDocument,
      TenderInformationDoc,
      userId,
      id,
      productCategoriesToConnect,
    } = (await req.json()) as Tender & {
      productCategoriesToConnect: ProductProductCategory[];
    };
    const productIds = await prisma.product.findMany({
      where: {
        category: {
          in: productCategoriesToConnect,
        },
      },
    });
    const createdTender = await prisma.tender.create({
      data: {
        BidEndDate,
        BidStartDate,
        BidNumber,
        Ministry,
        Organisation,
        OfficeName,
        Quantity,
        MinAvgAnTurnover,
        BidderYox,
        MseExemptionOnTurnoverAndYox,
        DocumentsRequiredFromBidder,
        TenderInformation,
        TenderInformationDoc,
        GemBidDocument,
        userId,
        productCategories: {
          // Create new TenderProductCategory records for each product
          createMany: {
            data: productIds.map((productId) => ({
              productId: productId.id,
              // You can add additional data to the TenderProductCategory here if needed
            })),
          },
        },
      },
      include: {
        createdBy: true,
        productCategories: true, // Include associated productCategories in the response
      },
    });
    return NextResponse.json(createdTender);
  } catch (error) {
    console.log("TENDER", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const { productCategoriesToConnect, id } = (await req.json()) as Tender & {
      productCategoriesToConnect: Product[];
    };

    const createdTender = await prisma.tender.update({
      where: { id },
      data: {
        productCategories: {
          // Create new TenderProductCategory records for each product
          createMany: {
            data: productCategoriesToConnect.map((productId) => ({
              productId: productId.id,
              // You can add additional data to the TenderProductCategory here if needed
            })),
          },
        },
      },
    });

    return NextResponse.json(createdTender);
  } catch (error) {
    console.log("TENDER", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
