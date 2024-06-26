"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../ui/data-table";
import { ApiList } from "../ui/api-list";
import { CategoryColumn, columns } from "./category-columns";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
};
export default CategoryClient;
