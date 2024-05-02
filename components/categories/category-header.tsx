"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const CategoryHeader = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading
        title="Categories"
        description="Manage your product categories here"
      />
      <Button onClick={() => onOpen("ADD_CATEGORY")}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add New Category
      </Button>
    </div>
  );
};
export default CategoryHeader;
