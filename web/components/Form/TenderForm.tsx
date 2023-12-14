"use client";
import React, { useState } from "react";
import { DatePickerWithRange } from "../ui/date-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Input } from "../ui/input";
import { Tender } from "@prisma/client";
import { UserWithProductsAndTenders } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
// import FileUpload from "../FileUpload";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { DialogFooter } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import DragDrop from "../DnD";

type Props = {
  user: UserWithProductsAndTenders;
};

const formSchema = z.object({
  tenderInfoPdfUrl: z.string().min(1, {
    message: "Tender Information PDF is required",
  }),
  gemPdfUrl: z.string().min(1, {
    message: "GEM pdf is required",
  }),
});

function TenderForm({ user }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [uploadedTenderInformation, setUploadedTenderInformation] = useState<
    string | undefined
  >();

  const [uploadedGemBidDoc, setUploadedGemBidDoc] = useState<
    string | undefined
  >();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gemPdfUrl: "",
      tenderInfoPdfUrl: "",
    },
  });
  const [tenderData, setTenderData] = React.useState<Tender>({
    id: 1,
    userId: user.id,
    BidEndDate: date!.to!,
    BidStartDate: date!.from!,
    BidNumber: "",
    Ministry: "Ministry of Power",
    Organisation: "North Eastern Electric Power Cooperation Limited",
    OfficeName: "",
    Quantity: 0,
    MinAvgAnTurnover: "",
    BidderYox: 0,
    MseExemptionOnTurnoverAndYox: false,
    DocumentsRequiredFromBidder: "",
    TenderInformation: "",
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log({ error });
    }
    console.log(values);
  };

  return (
    <div className="flex flex-col justify-center gap-2">
      <span className="text-[12px] font-bold border-black border-b-2">
        Autofill
      </span>
      <div className="flex gap-2 flex-col">
        <div className="mb-3">
          <span className="text-[12px] font-bold">Upload GEM Bid Document</span>
          <DragDrop url={uploadedGemBidDoc} setUrl={setUploadedGemBidDoc} />
        </div>

        <div>
          <span className="text-[12px] font-bold">
            Upload Tender Information Document
          </span>
          <DragDrop
            url={uploadedTenderInformation}
            setUrl={setUploadedTenderInformation}
          />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col justify-center gap-4">
        <span className="text-[12px] font-bold border-black border-b-2">
          Fill Manually
        </span>
        <div className="flex justify-between gap-2">
          <span className="flex flex-col">
            <span className="text-xs font-semibold ml-1 mb-1">
              creator of tender
            </span>
            <Input value={user.username + " (" + user.email + ")"} disabled />
          </span>
          <span className="flex flex-col">
            <span className="text-xs font-semibold ml-1 mb-1">
              issuing ministry
            </span>
            <Input value="Ministry of Power" disabled />
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="flex flex-col">
            <span className="text-xs font-semibold ml-1 mb-1">
              issuing organisation
            </span>
            <Input
              value="North Eastern Electric Power Corporation Limited"
              disabled
            />
          </span>
          <span className="flex flex-col">
            <span className="text-xs font-semibold ml-1 mb-1">
              issuing office name
            </span>
            <Input
              onChange={(e) =>
                setTenderData((prev) => ({
                  ...prev,
                  OfficeName: e.target.value,
                }))
              }
            />
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />

          <Input
            placeholder="Bid Number"
            onChange={(e) =>
              setTenderData((prev) => ({ ...prev, BidNumber: e.target.value }))
            }
          />
          <Input
            placeholder="Quantity"
            type="number"
            onChange={(e) =>
              setTenderData((prev) => ({
                ...prev,
                Quantity: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex justify-between gap-2">
          <Input
            placeholder="Minimum Required Years of Experience of Bidder"
            type="number"
            onChange={(e) =>
              setTenderData((prev) => ({
                ...prev,
                BidderYox: parseInt(e.target.value),
              }))
            }
          />
          <Input
            placeholder="Minimum Average Annual Turnover"
            type="number"
            onChange={(e) =>
              setTenderData((prev) => ({
                ...prev,
                MinAvgAnTurnover: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex items-center space-x-2 ml-1">
          <Checkbox
            id="mse"
            value={tenderData.MseExemptionOnTurnoverAndYox ? "true" : "false"}
            onCheckedChange={() =>
              setTenderData((prev) => ({
                ...prev,
                MseExemptionOnTurnoverAndYox:
                  !prev.MseExemptionOnTurnoverAndYox,
              }))
            }
          />
          <label
            htmlFor="mse"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Are MSEs exempted from Turnover & Years of Experience Condition
          </label>
        </div>
        <Textarea
          placeholder="Additional Documents Required"
          onChange={(e) =>
            setTenderData((prev) => ({
              ...prev,
              DocumentsRequiredFromBidder: e.target.value,
            }))
          }
        />
        <Textarea
          placeholder="Tender Information"
          onChange={(e) =>
            setTenderData((prev) => ({
              ...prev,
              TenderInformation: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-2">
        <Button variant={"default"} onClick={() => console.log({ tenderData })}>
          Submit
        </Button>
        <Button variant={"destructive"}>Clear</Button>
      </div>
    </div>
  );
}

export default TenderForm;
