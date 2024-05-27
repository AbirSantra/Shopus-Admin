import CustomerForm from "@/components/customers/customer-form";
import CustomerPageHeader from "@/components/customers/customer-page-header";
import prismadb from "@/lib/prismadb";

const CustomerPage = async ({
  params,
}: {
  params: { storeId: string; customerId: string };
}) => {
  const customer = await prismadb.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  return (
    <div className="flex-1">
      <CustomerPageHeader initialData={customer} />
      <CustomerForm initialData={customer} />
    </div>
  );
};
export default CustomerPage;
