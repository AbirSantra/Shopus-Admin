import CategoryClient from "@/components/categories/category-client";
import { CategoryColumn } from "@/components/categories/category-columns";
import CategoryHeader from "@/components/categories/category-header";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1">
      <CategoryHeader />
      <CategoryClient data={formattedCategories} />
    </div>
  );
};
export default CategoriesPage;
