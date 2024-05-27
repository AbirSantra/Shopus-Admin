"use client";

import { DataTable } from "../ui/data-table";
import { columns, CustomerColumn } from "./customer-columns";

interface CustomerClientProps {
  data: CustomerColumn[];
}

const CustomerClient = ({ data }: CustomerClientProps) => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
};

export default CustomerClient;
