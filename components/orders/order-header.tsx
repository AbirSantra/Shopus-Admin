"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { PlusIcon } from "lucide-react";

const OrderHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title="Orders" description="Manage your orders here" />
      <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Order
      </Button>
    </div>
  );
};
export default OrderHeader;
