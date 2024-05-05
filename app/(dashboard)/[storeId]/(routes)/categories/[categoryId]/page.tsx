import CategoryForm from "@/components/categories/category-form";
import CategoryPageHeader from "@/components/categories/category-page-header";
import prismadb from "@/lib/prismadb";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-1">
      <CategoryPageHeader initialData={category} />
      <CategoryForm initialData={category} billboards={billboards} />
    </div>
  );
};
export default CategoryPage;
