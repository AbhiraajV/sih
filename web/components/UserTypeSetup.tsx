"use client";
import {
  Product,
  ProductProductCategory,
  User,
  UserType,
} from "@prisma/client";
import React, { useEffect, useState } from "react";
import { UserWithProductsAndTenders } from "@/lib/types";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import useStore from "@/hooks/useStore";

type Props = {
  user: UserWithProductsAndTenders;
  products: Product[];
};
function convertCamelCaseToNormal(camelCaseString: string) {
  return camelCaseString
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}
const vendorOwnsThisType = (
  user: UserWithProductsAndTenders,
  productId: number
) => {
  if (
    user.products !== undefined &&
    user.products.some((product) => product.productId === productId)
  )
    return true;
  return false;
};

//

//

function UserTypeSetup({ user, products }: Props) {
  const [curUser, setCurUser] = useState<
    UserWithProductsAndTenders | undefined
  >(undefined);
  useEffect(() => {
    setCurUser(user);
    console.log({ user });
  }, [user]);
  const { togglePaymentModalOpen } = useStore();
  const router = useRouter();

  ///

  //

  useEffect(() => {
    if (user.userType === "Vendor" && !user.paid) {
      togglePaymentModalOpen();
    }
  }, [user, togglePaymentModalOpen]);
  if (!(user.userType === "Unknown" || user.userType === "Vendor"))
    return <></>;

  //
  //
  if (
    user.userType === "Vendor" &&
    // localStorage.getItem("paymentDone") !== "true"
    !user.paid
  )
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex  md:items-center md:justify-center z-50 bg-white"></div>
    );
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex  md:items-center md:justify-center z-50 bg-white">
      <div className="md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
        {user.userType === "Unknown" && (
          <>
            <span
              className="text-sm font-semibold w-full flex justify-center align-middle cursor-pointer"
              onClick={() =>
                axios
                  .post("/api/user/userType", { userType: "Vendor" })
                  .then((res) => {
                    console.log({ res });
                    router.refresh();
                  })
                  .catch((err) => console.log({ err }))
              }
            >
              Join as a Vendor within a few clicks!!
            </span>
            <span className="text-sm font-semibold w-full flex justify-center align-middle">
              OR
            </span>

            <span
              className="text-sm font-semibold w-full flex justify-center align-middle cursor-pointer"
              onClick={() =>
                axios
                  .post("/api/user/userType", {
                    userType: "NEEPCO_Employee" as UserType,
                  })
                  .then((res) => {
                    console.log({ res });
                    router.refresh();
                  })
                  .catch((err) => console.log({ err }))
              }
            >
              Part of the NEEPCO Team? Get Registered
            </span>
          </>
        )}
        {user.userType === "Vendor" && (
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-1 ml-2">
                <span className="text-md font-bold ">{user.username}</span>
                <span className="text-xs font-bold ">{user.email}</span>
                {/* 
                <span className="text-xs font-bold ">
                  Selling:
                  <span className="text-blue-700">
                  </span>
                  product(s)/service(s)
                </span> */}
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
            <Separator />
            <span className="text-sm md:text-lg font-bold ml-2 w-[94vw]">
              Choose your Product Category{" "}
              <span className="text-blue-600 font-semibold text-xs md:text-md">
                ({user.products.length + " chosen"})
              </span>
            </span>
            <div
              className="w-full h-[80vh] overflow-y-scroll p-2 grid grid-cols-2 gap-4"
              style={{ gridAutoFlow: "dense !important" }}
            >
              {products.map(({ category, description, id }) => (
                <div
                  className={`${
                    vendorOwnsThisType(user, id)
                      ? "text-white bg-blue-600 rounded-md border-gray-500 border-[2px] p-2 md:p-4 cursor-pointer flex justify-between md:justify-center items-start flex-col text-sm font-semibold"
                      : "rounded-md border-gray-500 p-2 md:p-4 cursor-pointer flex justify-between md:justify-center items-start flex-col text-sm font-semibold border-[2px]"
                  } ${
                    category.split(" ").length > 3 ? "col-span-2" : "col-span-1"
                  }`}
                  key={category}
                  onClick={async () => {
                    const { data: savedUser } = await axios.post(
                      "/api/vendor",
                      {
                        curUser,
                        productType: category,
                      }
                    );
                    console.log({ savedUser });
                    setCurUser(savedUser);
                    router.refresh();
                  }}
                >
                  {convertCamelCaseToNormal(category)}
                  <span
                    className={
                      vendorOwnsThisType(user, id)
                        ? "text-xs font-normal text-white"
                        : "text-xs font-normal"
                    }
                  >
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTypeSetup;
