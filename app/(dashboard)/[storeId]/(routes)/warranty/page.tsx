import WarrantyClient from "@/components/warranty/warranty-client";
import { WarrantyColumn } from "@/components/warranty/warranty-columns";
import WarrantyHeader from "@/components/warranty/warranty-header";
import prismadb from "@/lib/prismadb";

const WarrantiesPage = async ({ params }: { params: { storeId: string } }) => {
  const orderItems = await prismadb.orderItem.findMany({
    where: {
      includeWarranty: true,
    },
    include: {
      product: true,
    },
  });

  const formattedWarranties: WarrantyColumn[] = orderItems.map((item) => ({
    id: item.id,
    productName: item.product.name,
    orderId: item.orderId,
    warrantyStatus: item.warrantyStatus,
  }));

  return (
    <div className="flex-1">
      <WarrantyHeader />
      <WarrantyClient data={formattedWarranties} />
    </div>
  );
};
export default WarrantiesPage;
