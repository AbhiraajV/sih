"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Provider } from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import "@uploadthing/react/styles.css";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  icons: { apple: "/icon-192x192.png" },
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ClerkProvider>
        {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}
        <html lang="en">
          <body className={inter.className + " w-[95vw] md:px-[20vw] py-3"}>
            <EdgeStoreProvider>
              {/* <Loading /> */}
              <Navbar />
              <Toaster />
              {children}
            </EdgeStoreProvider>
          </body>
        </html>
      </ClerkProvider>
    </LocalizationProvider>
  );
}
