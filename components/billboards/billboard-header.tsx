"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const BillboardHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title="Billboards" description="Manage your billboards here" />
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Billboard
      </Button>
    </div>
  );
};
export default BillboardHeader;
