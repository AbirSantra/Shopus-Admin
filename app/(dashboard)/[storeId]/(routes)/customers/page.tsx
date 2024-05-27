import CustomerClient from "@/components/customers/customer-client";
import { CustomerColumn } from "@/components/customers/customer-columns";
import CustomersHeader from "@/components/customers/customers-header";
import prismadb from "@/lib/prismadb";
import { string } from "zod";

const CustomersPage = async ({ params }: { params: { storeId: string } }) => {
  const customers = await prismadb.customer.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: "asc",
    },
  });

  const formattedCustomers: CustomerColumn[] = customers.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
  }));

  return (
    <div className="flex-1">
      <CustomersHeader />
      <CustomerClient data={formattedCustomers} />
    </div>
  );
};
export default CustomersPage;
