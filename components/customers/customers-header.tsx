"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const CustomersHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading
        title="Customers"
        description="Manage your store customers here"
      />
      <Button onClick={() => router.push(`/${params.storeId}/customers/new`)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Customer
      </Button>
    </div>
  );
};
export default CustomersHeader;
