import React from "react";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ServerControlledPagination from "./server-controlled-pagination";
import PaymentFormModalDialogue from "@/components/modal/PaymentFormModalDialogue";
import DeleteFileFormModalDialogue from "@/components/modal/DeleteFileModal";
import UserTypeDistributionChart from "@/components/charts/UserDistributionPie";
import { BarChart } from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutPlot";
import TenderForm from "@/components/Form/TenderForm";
import { UserWithProductsAndTenders } from "@/lib/types";
import { LineChart } from "@/components/charts/LineChart";
import { Bar } from "react-chartjs-2";
import VendorBar from "@/components/charts/VendorBar";
type Props = {
  searchParams: any;
};

async function YourFiles({ searchParams }: Props) {
  // if (!user) return <></>;
  const products = await prisma.product.findMany({
    select: { category: true },
  });
  console.log({ products });
  let count = undefined;
  count =
    count === undefined
      ? await prisma.tender.count({
          where: {},
        })
      : count;
  let skip = parseInt(searchParams["skip"] as string, 10);
  let take = parseInt(searchParams["take"] as string, 10);
  let filter_name = searchParams["filter_name"];

  const files = await prisma.tender.findMany({
    where: {
      // name: {
      //   contains: filter_name,
      // },
      BidNumber: {
        contains: filter_name,
      },
    },
    orderBy: {
      BidStartDate: "asc",
    },
    skip: !skip || !take ? 0 : skip * take,
    take: !take ? 5 : take,
  });
  return (
    <div className="flex flex-wrap gap-4 p-8 w-[100vw] ml-[-40%] relative">
      <PaymentFormModalDialogue />
      <DeleteFileFormModalDialogue />

      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
        <div className="bg-white rounded-lg p-4 ">
          <div className="mb-4 flex gap-2 justify-between items-center">
            <DataTable columns={columns} data={files} />
            {/* <TenderForm user={user} /> */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-1">
                <div className="flex justify-start items-start border-gray rounded-md shadow-md p-[20px] w-[200px] h-[30%] flex-col gap-3">
                  <span className="text-lg border-b-2 border-blue-700 font-semibold">
                    On Going Bids
                  </span>
                  <span className="text-[3rem] font-bold text-blue-600 ml-[100px]">
                    89
                  </span>
                </div>

                <div className="flex justify-start items-start border-gray rounded-md shadow-md p-[20px] w-[200px] h-[30%] flex-col gap-3">
                  <span className="text-lg border-b-2 border-blue-700 font-semibold">
                    Vendor Contacted
                  </span>
                  <span className="text-[3rem] font-bold text-blue-600 ml-[70px]">
                    342
                  </span>
                </div>
              </div>
              <div className="p-1 shadow-md rounded-sm">
                <h3 className="text-lg font-semibold pl-3 ">
                  <span className="border-b-[2px] border-blue-600">
                    Tender Vendor Distribution
                  </span>
                </h3>
                <LineChart
                  v_dataset={[
                    0, 20, 60, 100, 200, 150, 105, 107, 110, 110, 110, 110, 110,
                    110, 110, 110, 110, 110, 200, 220, 220, 230, 240, 280, 300,
                    300, 300, 300, 300, 300, 300, 300,
                  ]}
                  dataset={[
                    0, 2, 10, 8, 9, 20, 40, 50, 100, 90, 110, 120, 150, 160,
                    160, 160, 160, 160, 170, 180, 190, 200,
                  ]}
                />
              </div>
              <div className="p-1 shadow-md rounded-sm">
                <h3 className="text-lg font-semibold pl-3 ">
                  <span className="border-b-[2px] border-blue-600">
                    MSE to Total Vendor Distribution
                  </span>
                </h3>
                <VendorBar />
              </div>
            </div>
          </div>
          <ServerControlledPagination count={count} curlen={files.length} />
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Charts Section</h2>

          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3 border-gray rounded-md shadow-md p-[20px]">
              <h3 className="text-lg font-semibold mb-2">
                Monthly Tender Report
              </h3>
              <BarChart
                labels={[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
                done={[17, 20, 9, 23, 12, 13, 31, 29, 25, 27, 20, 7]}
                pending={[1, 0, 1, 3, 2, 1, 13, 9, 5, 10, 0, 7]}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 border-gray rounded-md shadow-md p-[20px]">
              <h3 className="text-lg font-semibold mb-14">
                Categorized Vendor Distribution
              </h3>
              <DonutChart
                labels={products.map((product) => product.category)}
                dataset={products.map(() => Math.floor(Math.random() * 100))}
              />
            </div>
          </div>

          <div className="w-[67.85%] border-gray rounded-md shadow-md p-[20px]">
            <h3 className="text-lg font-semibold mb-2">
              Categorized Tender Distribution
            </h3>
            <BarChart
              labels={products.map((product) => product.category)}
              done={products.map(() => Math.floor(Math.random() * 31))}
              pending={products.map(() => Math.floor(Math.random() * 31))}
            />
          </div>
        </div>
      </div>
      <div className="absolute rounded-lg bottom-[5%] right-[2.5%] h-[90vh] w-[30vw] bg-blue-300">
        Chat
      </div>
    </div>
  );
}

export default YourFiles;
