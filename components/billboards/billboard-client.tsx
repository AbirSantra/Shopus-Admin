"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./billboard-columns";
import { DataTable } from "../ui/data-table";
import { ApiList } from "../ui/api-list";

interface BillboardClientProps {
  data: BillboardColumns[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <DataTable columns={columns} data={data} searchKey="label" />
    </div>
  );
};
export default BillboardClient;
