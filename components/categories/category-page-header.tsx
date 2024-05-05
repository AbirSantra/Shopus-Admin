"use client";

import { Category } from "@prisma/client";
import { Heading } from "../ui/heading";

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryPageHeader = ({ initialData }: CategoryFormProps) => {
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData
    ? "Edit your category settings here"
    : "Create new Category here";

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title={title} description={description} />
    </div>
  );
};
export default CategoryPageHeader;
