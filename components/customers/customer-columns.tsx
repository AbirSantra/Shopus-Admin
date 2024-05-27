"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomerCellAction } from "./customer-cell-action";

export type CustomerColumn = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CustomerCellAction data={row.original} />,
  },
];
