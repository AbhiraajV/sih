"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStore from "@/hooks/useStore";
// import { bitsToMbs, image_size } from "@/utils/helpers/sizeBitsObject";
import { Tender } from "@prisma/client";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Crown,
  DollarSign,
  Download,
  FileIcon,
  Info,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const DescriptionRender = ({ description }: { description: string }) => {
  const [toggleShorten, setToggleShorten] = useState(true);
  return (
    <div
      className="w-[300px] fon cursor-pointer text-xs"
      onClick={() => setToggleShorten(!toggleShorten)}
    >
      {toggleShorten ? description.slice(0, 80) + "..." : description}
    </div>
  );
};

const ActionRender = ({ row }: { row: Row<Tender> }) => {
  "use client";
  const {
    togglePaymentModalOpen,
    updatePaymentState,
    toggleDeleteFileModalOpen,
    updateDeleteFileState,
    isDeleteFileModalOpen,
  } = useStore();

  return (
    <div className="w-[100px] flex gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Download size={15} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Request Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Trash
              size={15}
              onClick={() => {
                toggleDeleteFileModalOpen();
                // updateDeleteFileState({
                //   fileId: row.original.firestoreZipUrl,
                //   userId: row.original.id,
                // });
                console.log({ isDeleteFileModalOpen });
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete File</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DollarSign
              size={15}
              onClick={() => {
                togglePaymentModalOpen();
                // updatePaymentState({
                //   fileId: row.original.id,
                //   userId: row.original.profileId,
                // });
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Fund to Prioritize this file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const NameRender = ({ row }: { row: Row<Tender> }) => {
  const router = useRouter();
  if (!router) return <></>;
  return (
    <div
      onClick={() => {
        console.log(row.original.BidNumber);
        router.push("/your-tenders/" + row.original.id);
        router.refresh();
      }}
      className="cursor-pointer w-[150px] flex justify-center items-center hover:transform hover:scale-105 hover:font-bold hover:text-blue-500 transition-transform transition-font"
    >
      <span className=" lg:w-[60%] w-[100%] relative text-xs font-bold">
        {row.original.BidNumber}
      </span>
    </div>
  );
};
export const columns: ColumnDef<Tender>[] = [
  {
    id: "select",
    header: () => (
      <div className="flex justify-center items-center gap-1">
        Action
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={15} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Hover on action buttons for more info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) => <ActionRender row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "BidNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bid Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <NameRender row={row} />,
  },

  {
    accessorKey: "GemBidDocument",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documents
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs w-[150px] font-bold flex flex-col gap-1">
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
            <a
              href={row.original.GemBidDocument!}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              {"GeM Bid Document"}{" "}
              {/* Display a default name if 'name' is not available */}
            </a>
          </div>
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
            <a
              href={row.original.TenderInformationDoc!}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              {"Tender Document"}{" "}
              {/* Display a default name if 'name' is not available */}
            </a>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "OfficeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Office Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs w-[400px]">
          <span className="flex gap-1">
            <span className="font-bold">Ministry:</span>
            {row.original.Ministry}
          </span>
          <span className="flex gap-1">
            <span className="font-bold">Organisation:</span>
            {row.original.Organisation}
          </span>
          <span className="flex gap-1">
            <span className="font-bold">Office Name:</span>
            {row.original.OfficeName}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "BidStartDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Times
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate: string = new Date(
        row.original.BidStartDate!.toISOString()
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const updatedDate: string = new Date(
        row.original.BidEndDate!.toISOString()
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return (
        <div className="text-xs w-[150px]">
          {"Bid Start Date: " + createdDate} <br />{" "}
          {"Bid End Date: " + updatedDate}
        </div>
      );
    },
  },

  {
    accessorKey: "DocumentsRequiredFromBidder",
    header: "Description",
    cell: ({ row }) => {
      return (
        <DescriptionRender
          description={
            row.original.DocumentsRequiredFromBidder
              ? row.original.DocumentsRequiredFromBidder
              : ""
          }
        />
      );
    },
  },
  {
    accessorKey: "Quantity",
    header: "Bidding Requirements",
    cell: ({ row }) => {
      return (
        <div className="text-xs w-[400px]">
          <span className="flex gap-1">
            <span className="font-bold">Years of Experience:</span>
            {row.original.BidderYox}
          </span>
          <span className="flex gap-1">
            <span className="font-bold">Minimum Annual Average Turnover:</span>
            {row.original.MinAvgAnTurnover}
          </span>
          <span className="flex gap-1">
            <span className="font-bold">MSE Exemption?</span>
            {row.original.MseExemptionOnTurnoverAndYox ? "Yes" : "No"}
          </span>
          <span className="flex gap-1">
            <span className="font-bold">Required Quanitity:</span>
            {row.original.Quantity}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "decodedFileFirestoreUrl",
  //   header: "Decoded Status",
  // },
];
