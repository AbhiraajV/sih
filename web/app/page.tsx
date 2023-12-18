import { initiateProfile } from "@/lib/initiate-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import UserTypeSetup from "@/components/UserTypeSetup";
import prisma from "@/lib/prisma";
import EmployeeHome from "@/components/EmployeeHome";
import PaymentFormModalDialogue from "@/components/modal/PaymentFormModalDialogue";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home({ searchParams }: Props) {
  const { redirect_status } = searchParams;
  // const router = useRouter();
  const user = await initiateProfile();

  if (redirect_status === "succeeded") {
    await prisma.user.update({ where: { id: user.id }, data: { paid: true } });
    redirect("/");
  }
  const products = await prisma.product.findMany({});
  if (!user) redirectToSignIn();
  const users = await prisma.user.findMany({
    where: {
      AND: {
        userType: "NEEPCO_Employee",
        verified: {
          not: "TRUE",
        },
      },
    },
  });
  return (
    <div className="max-w-[100vw]">
      {/* <FileInfoFormModal /> */}
      <UserTypeSetup user={user} products={products} />
      <EmployeeHome user={user} users={users} />
      <PaymentFormModalDialogue />
    </div>
  );
}
