import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { UserWithProductsAndTenders } from "./types";

export const initiateProfile =
  async (): Promise<UserWithProductsAndTenders> => {
    const user = await currentUser();
    console.log({ user });
    if (!user) return redirectToSignIn();
    const profile = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
      include: {
        products: true,
        tenders: true,
      },
    });
    if (profile) return profile;

    const newProfile = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        userId: user.id,
        username: "",
        userType: "Unknown",
        products: undefined,
        tenders: undefined,
      },
      include: {
        products: true,
        tenders: true,
      },
    });

    return newProfile;
  };
