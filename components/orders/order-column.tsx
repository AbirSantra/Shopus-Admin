"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumns = {
  id: string;
  customer: string;
  isPaid: boolean;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
