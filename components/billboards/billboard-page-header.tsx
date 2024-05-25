"use client";

import { Billboard } from "@prisma/client";
import { Heading } from "../ui/heading";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardPageHeader = ({ initialData }: BillboardFormProps) => {
  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData
    ? "Edit your billboard settings here"
    : "Create new Billboard here";

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title={title} description={description} />
    </div>
  );
};
export default BillboardPageHeader;
