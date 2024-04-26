"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardCellAction } from "./billboard-cell-action";

export type BillboardColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardCellAction data={row.original} />,
  },
];
