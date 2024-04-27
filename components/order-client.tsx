"use client";

import { Heading } from "./ui/heading";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./ui/data-table";
import { columns, OrderColumns } from "./order-column";

interface OrderClientProps {
  data: OrderColumns[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
export default OrderClient;
