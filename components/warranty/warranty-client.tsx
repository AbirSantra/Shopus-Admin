"use client";

import { DataTable } from "../ui/data-table";
import { columns, WarrantyColumn } from "./warranty-columns";

interface WarrantyClientProps {
  data: WarrantyColumn[];
}

const WarrantyClient = ({ data }: WarrantyClientProps) => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="orderId" />
    </div>
  );
};
export default WarrantyClient;
