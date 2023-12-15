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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  if (!(user.userType === "Unknown" || user.userType === "Vendor"))
    return <></>;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 ml-2">
              <span className="text-md font-bold ">
                {user.username}Abhiraaj Verma
              </span>
              <span className="text-xs font-bold ">{user.email}</span>

              <span className="text-xs font-bold ">
                You are selling: {user.products.length} types of
                product(s)/service(s)
              </span>
            </div>
            <span className="text-lg font-bold ml-2">
              Does your Product/Service Belong to one of these categories?
            </span>
            <div className="w-full h-[80vh] overflow-y-scroll p-2">
              <div className="grid grid-cols-2 gap-4">
                {products.map(({ category, description, id }) => (
                  <div
                    className={
                      vendorOwnsThisType(user, id)
                        ? "text-white bg-blue-600 rounded-md border-gray-500 border-[2px] p-4 cursor-pointer flex justify-center items-start flex-col text-sm font-semibold"
                        : "rounded-md border-gray-500 p-4 cursor-pointer flex justify-center items-start flex-col text-sm font-semibold border-[2px]"
                    }
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
                          ? "text-xs font-semibold text-white"
                          : "text-xs font-semibold"
                      }
                    >
                      {description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTypeSetup;
