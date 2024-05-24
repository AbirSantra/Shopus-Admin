"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const ProductHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title="Products" description="Manage your products here" />
      <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Product
      </Button>
    </div>
  );
};
export default ProductHeader;
