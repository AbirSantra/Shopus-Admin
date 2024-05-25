import BillboardForm from "@/components/billboards/billboard-form";
import BillboardPageHeader from "@/components/billboards/billboard-page-header";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-1">
      <BillboardPageHeader initialData={billboard} />
      <BillboardForm initialData={billboard} />
    </div>
  );
};
export default BillboardPage;
