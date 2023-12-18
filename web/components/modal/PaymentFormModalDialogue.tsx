"use client";
import useStore from "@/hooks/useStore";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment";
import { STRIPE_APIKEY } from "@/hooks/types/type";
type Props = {};

function PaymentFormModalDialogue({}: Props) {
  const { togglePaymentModalOpen, isPaymentModalOpen } = useStore(
    (state) => state
  );
  const [clientPaymentSecret, setClientPaymentSecret] = useState<
    undefined | string
  >(undefined);
  useEffect(() => {
    if (clientPaymentSecret || !isPaymentModalOpen) return;
    axios
      .post("/api/payment", {
        amount: 10,
      })
      .then((response) => {
        console.log(response);
        setClientPaymentSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientPaymentSecret, isPaymentModalOpen]);
  const stripePromise = loadStripe(STRIPE_APIKEY);
  // if (localStorage.getItem("paymentDone") === "true") return <></>;
  if (!isPaymentModalOpen || !clientPaymentSecret) return;
  <Dialog open={isPaymentModalOpen} onOpenChange={togglePaymentModalOpen}>
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Get Prioritized Tender Information!
        </DialogTitle>
        <DialogDescription className="w-full text-center text-xs">
          By completing this payment, you will be registered with us, and we
          will notify you of tailored tenders matching your expertise.
          <br />
          <span className="text-xs font-bold">
            {" "}
            Get updates on opportunities personalized just for you.
          </span>
        </DialogDescription>
      </DialogHeader>
      {/* <Payment />{" "} */}
    </DialogContent>
  </Dialog>;
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: clientPaymentSecret }}
    >
      <Dialog
        open={isPaymentModalOpen}
        onOpenChange={() => {
          // localStorage.setItem("paymentDone", "true");
          togglePaymentModalOpen();
        }}
      >
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Get Prioritized Tender Information!
            </DialogTitle>
            <DialogDescription className="w-full text-center text-xs">
              By completing this payment, you will be registered with us, and we
              will notify you of tailored tenders matching your expertise.
              <br />
              <span className="text-xs font-bold">
                {" "}
                Get updates on opportunities personalized just for you.
              </span>
            </DialogDescription>
          </DialogHeader>
          <Payment />{" "}
        </DialogContent>
      </Dialog>
    </Elements>
  );
}

export default PaymentFormModalDialogue;
