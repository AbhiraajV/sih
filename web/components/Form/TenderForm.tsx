"use client";
import React, { useEffect, useState } from "react";
import { DatePickerWithRange } from "../ui/date-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Input } from "../ui/input";
import { ProductProductCategory, Tender } from "@prisma/client";
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
import Loading from "../Loading";

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
  const [categories, setCategories] = useState<
    ProductProductCategory | undefined
  >();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [uploadedTenderInformation, setUploadedTenderInformation] = useState<
    string | undefined
  >();
  const [autofill, setAutoFill] = useState<boolean>(true);

  const [uploadedGemBidDoc, setUploadedGemBidDoc] = useState<
    string | undefined
  >();

  const [loading, setLoading] = useState<boolean>(false);

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
    BidNumber: null,
    Ministry: "Ministry of Power",
    Organisation: "North Eastern Electric Power Cooperation Limited",
    OfficeName: null,
    Quantity: null,
    MinAvgAnTurnover: null,
    BidderYox: null,
    MseExemptionOnTurnoverAndYox: false,
    DocumentsRequiredFromBidder: null,
    TenderInformation: null,
    GemBidDocument: null,
    TenderInformationDoc: null,
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

  useEffect(() => {
    if (uploadedGemBidDoc !== undefined && autofill) {
      setLoading(true);
      axios
        .post("http://localhost:8080/extract-pdf", {
          pdfLink: uploadedGemBidDoc,
        })
        .then((response) => {
          console.log({ out: response.data.out });
          const tenderExtr = response.data.out as Tender;
          setTenderData(tenderExtr);
          console.log({ tenderExtr });
          setUploadedGemBidDoc(undefined);
          setLoading(false);
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [uploadedGemBidDoc]); //

  useEffect(() => {
    if (uploadedTenderInformation !== undefined && autofill) {
      axios
        .post("http://localhost:8081/extract-pdf", {
          pdfLink: uploadedTenderInformation,
        })
        .then(({ data: { out, extractedText } }) => {
          console.log({ out, extractedText });
          setCategories(out.relatedCategories);
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [uploadedTenderInformation]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <span className="text-[12px] font-bold border-black border-b-2">
        <div className="flex gap-1 items-center">
          <Checkbox
            onCheckedChange={() => {
              setAutoFill(!autofill);
            }}
            className="border-[1px]"
            checked={autofill}
          />
          Autofill{" "}
        </div>
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
      <div className="flex flex-col justify-center gap-4 relative">
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
            <Input
              value={
                tenderData.Ministry !== null && tenderData.Ministry.length >= 0
                  ? tenderData.Ministry
                  : "Ministry of Power"
              }
              disabled
            />
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="flex flex-col">
            <span className="text-xs font-semibold ml-1 mb-1">
              issuing organisation
            </span>
            <Input
              value={
                tenderData.Organisation !== null &&
                tenderData.Organisation.length >= 0
                  ? tenderData.Organisation
                  : "North Eastern Electric Power Corporation Limited"
              }
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
              value={tenderData.OfficeName ? tenderData.OfficeName : undefined}
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
            value={tenderData.BidNumber ? tenderData.BidNumber : undefined}
          />
          <Input
            placeholder="Quantity"
            // type="number"
            onChange={(e) =>
              setTenderData((prev) => ({
                ...prev,
                Quantity: parseInt(e.target.value),
              }))
            }
            value={
              tenderData.Quantity !== null ? tenderData.Quantity : undefined
            }
          />
        </div>
        <div className="flex justify-between gap-2">
          <Input
            placeholder="Minimum Required Years of Experience of Bidder"
            // type="number"
            onChange={(e) =>
              setTenderData((prev) => ({
                ...prev,
                BidderYox: parseInt(e.target.value),
              }))
            }
            value={
              tenderData.BidderYox !== null
                ? isNaN(tenderData.BidderYox)
                  ? 0
                  : tenderData.BidderYox
                : undefined
            }
          />
          <Input
            placeholder="Minimum Average Annual Turnover"
            // type="number"
            value={
              tenderData.MinAvgAnTurnover !== null
                ? tenderData.MinAvgAnTurnover
                : undefined
            }
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
            value={
              // @ts-ignore
              tenderData.MseExemptionOnTurnoverAndYox !== "No"
                ? "true"
                : "false"
            }
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
          value={
            tenderData.DocumentsRequiredFromBidder !== null
              ? tenderData.DocumentsRequiredFromBidder
              : undefined
          }
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
        <Loading loading={loading} />
      </div>
      <div className="flex gap-2">
        <Button
          variant={"default"}
          onClick={async () => {
            const data = autofill
              ? {
                  ...tenderData,
                  GemBidDocument: uploadedGemBidDoc,
                  DocumentsRequiredFromBidder:
                    tenderData.DocumentsRequiredFromBidder?.toString(),
                  TenderInformationDoc: uploadedTenderInformation,
                  userId: user.id,
                  // @ts-ignore
                  BidStartDate: new Date(tenderData.BidStartDate),
                  // @ts-ignore
                  BidEndDate: new Date(tenderData.BidEndDate),
                  Quantity:
                    typeof tenderData.Quantity === "number"
                      ? tenderData.Quantity
                      : typeof tenderData.Quantity === "string" &&
                        !isNaN(parseInt(tenderData.Quantity, 10))
                      ? parseInt(tenderData.Quantity, 10)
                      : 0,

                  MseExemptionOnTurnoverAndYox:
                    !tenderData.MseExemptionOnTurnoverAndYox ||
                    // @ts-ignore
                    tenderData.MseExemptionOnTurnoverAndYox === "false"
                      ? false
                      : true,
                  BidderYox:
                    typeof tenderData.BidderYox === "number"
                      ? tenderData.BidderYox
                      : typeof tenderData.BidderYox === "string" &&
                        !isNaN(parseInt(tenderData.BidderYox, 10))
                      ? parseInt(tenderData.BidderYox, 10)
                      : 0,
                  productCategoriesToConnect: categories,
                  MinAvgAnTurnover: tenderData?.MinAvgAnTurnover?.toString(),
                }
              : tenderData;
            console.log({ data });
            axios
              .put("/api/tender", { ...data })
              .then(async (res) => {
                console.log(res);
                const mail = await axios.post("/api/send", {
                  id: tenderData.id,
                });
                console.log({ mail });
                // router.push("/your-tenders");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Submit
        </Button>
        <Button variant={"destructive"}>Clear</Button>
      </div>
    </div>
  );
}

export default TenderForm;
