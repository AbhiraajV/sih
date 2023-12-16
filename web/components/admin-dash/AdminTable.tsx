"use client";
import React from "react";
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
// import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
};

function AdminTable({ users }: Props) {
  const router = useRouter();
  return (
    <Table>
      <TableCaption>Users Seeking KYC.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>User Email</TableHead>
          <TableHead>Time set for KYC</TableHead>
          <TableHead className="text-right">Approve?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <DateTimePicker
                value={user.kycTime ? dayjs(user.kycTime!) : undefined}
                onAccept={async (newValue) => {
                  const userUpdated = await axios.post("/api/user/kycTime", {
                    kycTime: newValue,
                    uid: user.id,
                  });
                  console.log({ userUpdated });
                }}
                // onChange={}
              />
            </TableCell>
            <TableCell
              className="text-right"
              onClick={async () => {
                const userUpdated = await axios.post("/api/user/verified", {
                  uid: user.id,
                });
                console.log({ userUpdated });
                router.refresh();
              }}
            >
              <div className="cursor-pointer ml-8">
                <CheckCheck />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminTable;
