import { initiateProfile } from "@/lib/initiate-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import UserTypeSetup from "@/components/UserTypeSetup";
import prisma from "@/lib/prisma";
import EmployeeHome from "@/components/EmployeeHome";

export default async function Home() {
  const user = await initiateProfile();
  const products = await prisma.product.findMany({});
  console.log({ user });
  if (!user) redirectToSignIn();
  return (
    <div className="max-w-[100vw]">
      {/* <FileInfoFormModal /> */}
      <UserTypeSetup user={user} products={products} />
      <EmployeeHome />
    </div>
  );
}
