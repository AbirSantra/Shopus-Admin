import { Order } from "@prisma/client";
import { Heading } from "../ui/heading";

interface OrderFormProps {
  initialData: Order | null;
}

const OrderPageHeader = ({ initialData }: OrderFormProps) => {
  const title = initialData ? "Edit Order" : "Create Order";
  const description = initialData
    ? "Edit your Order here"
    : "Create new Order here";

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Heading title={title} description={description} />
    </div>
  );
};
export default OrderPageHeader;
