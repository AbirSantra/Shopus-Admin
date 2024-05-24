"use client";

import { Product } from "@prisma/client";
import { Heading } from "../ui/heading";

interface ProductFormProps {
  initialData: Product | null;
}

const ProductPageHeader = ({ initialData }: ProductFormProps) => {
  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData
    ? "Edit your product details here"
    : "Create new Product here";

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title={title} description={description} />
    </div>
  );
};
export default ProductPageHeader;
