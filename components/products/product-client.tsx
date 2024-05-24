"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../ui/data-table";
import { ApiList } from "../ui/api-list";
import { columns, ProductColumn } from "./product-columns";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
};
export default ProductClient;
