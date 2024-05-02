"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const CategoryHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Categories"
        description="Manage categories of your store products"
      />
      <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Category
      </Button>
    </div>
  );
};
export default CategoryHeader;
