import { Product, ProductUser, Tender, User } from "@prisma/client";

export type UserWithProductsAndTenders = User & {
  products: ProductUser[];
  tenders: Tender[];
};
