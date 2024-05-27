"use client";

import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../ui/data-table";
import { columns, OrderColumns } from "./order-column";

interface OrderClientProps {
  data: OrderColumns[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="customer" />
    </div>
  );
};
export default OrderClient;
