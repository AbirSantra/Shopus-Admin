"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WarrantyCellAction } from "./warranty-cell-action";
import { WarrantyStatus } from "@prisma/client";

export type WarrantyColumn = {
  id: string;
  orderId: string;
  productName: string;
  warrantyStatus: WarrantyStatus | null;
};

export const columns: ColumnDef<WarrantyColumn>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "productName",
    header: "Product",
  },
  {
    accessorKey: "warrantyStatus",
    header: "Warranty Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <WarrantyCellAction data={row.original} />,
  },
];
