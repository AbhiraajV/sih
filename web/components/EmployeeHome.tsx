"use client";
import { UserWithProductsAndTenders } from "@/lib/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, ProductUser, Tender, User } from "@prisma/client";
import React from "react";
import AdminTable from "./admin-dash/AdminTable";

type Props = {
  user: UserWithProductsAndTenders;
  users: User[];
};

function formatDateStringWithAMPM(dateString: string) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options as any
  );
  return formattedDate.replace(
    /(\d+)(th|st|nd|rd)/,
    (_, num, suffix) => num + "<sup>" + suffix + "</sup>"
  );
}

function EmployeeHome({ user, users }: Props) {
  const router = useRouter();
  if (user.verified === "TRUE" && user.userType === "NEEPCO_Employee")
    router.push("/create-tender");
  console.log({ users });
  if (user.userType === "Admin") return <AdminTable users={users} />;
  return (
    <div className="text-lg font-semibold flex gap-1 items-center ">
      {user.verified === "FALSE" ? (
        <div className="text-lg font-semibold flex gap-1 items-center ">
          {" "}
          Waiting For NEEPCO Admin to Schedule KYC <Loader className="" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <a href="http://localhost:3001">
            KYC Scheduled at{" "}
            <span className="border-b-[2px] border-blue-600 font-bold">
              {formatDateStringWithAMPM(user.kycTime!)}
            </span>
          </a>
          <iframe
            src="http://localhost:3001" // Change this URL to match your React app on port 3001
            title="Embedded React App"
            width="1000"
            height="500"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
}

export default EmployeeHome;
