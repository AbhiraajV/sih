import { auth } from "@clerk/nextjs";
import prisma from "./prisma";
import { UserWithProductsAndTenders } from "./types";

export const currentProfile =
  async (): Promise<UserWithProductsAndTenders | null> => {
    const { userId } = auth();

    if (!userId) return null;

    const profile = await prisma.user.findUnique({
      where: { userId },
      include: {
        products: true,
        tenders: true,
      },
    });
    return profile;
  };
