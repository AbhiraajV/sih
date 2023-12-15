import prisma from "@/lib/prisma";
import { UserWithProductsAndTenders } from "./types";
import { ProductProductCategory } from "@prisma/client";
export const connectUserToProduct = async (
  user: UserWithProductsAndTenders,
  productType: ProductProductCategory
) => {
  // Find the product
  const product = await prisma.product.findFirst({
    where: {
      category: productType,
    },
  });

  const existingConnection = await prisma.productUser.findFirst({
    where: {
      userId: user.id,
      productId: product?.id,
    },
  });

  if (existingConnection) {
    await prisma.productUser.delete({
      where: {
        productId_userId: existingConnection, // Use the existingConnection object itself
      },
    });
  }

  // Create a new ProductUser record if not already connected
  if (!existingConnection) {
    await prisma.productUser.create({
      data: {
        user: { connect: { id: user.id } },
        product: { connect: { id: product?.id } },
      },
    });
  }

  // Fetch the updated user including related products and tenders
  const updatedUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { products: true, tenders: true },
  });

  return updatedUser;
};

export const createProduct = async ({
  category,
  description,
}: {
  category: ProductProductCategory;
  description: string;
}) => {
  const product = await prisma.product.create({
    data: {
      category: category,
      description: description,
    },
  });
  return product;
};
