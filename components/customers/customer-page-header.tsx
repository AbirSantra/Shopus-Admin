import { Customer } from "@prisma/client";
import { Heading } from "../ui/heading";

interface CustomerFormProps {
  initialData: Customer | null;
}

const CustomerPageHeader = ({ initialData }: CustomerFormProps) => {
  const title = initialData ? "Edit Customer" : "Create Customer";
  const description = initialData
    ? "Edit your Customer here"
    : "Create new Customer here";

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title={title} description={description} />
    </div>
  );
};
export default CustomerPageHeader;
