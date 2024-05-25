import BillboardClient from "@/components/billboards/billboard-client";
import { BillboardColumns } from "@/components/billboards/billboard-columns";
import BillboardHeader from "@/components/billboards/billboard-header";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumns[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1">
      <BillboardHeader />
      <BillboardClient data={formattedBillboards} />
    </div>
  );
};
export default BillboardsPage;
