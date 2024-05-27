import ProductForm from "@/components/products/product-form";
import ProductPageHeader from "@/components/products/product-page-header";
import prismadb from "@/lib/prismadb";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-1">
      <ProductPageHeader initialData={product} />
      <ProductForm initialData={product} categories={categories} />
    </div>
  );
};
export default ProductPage;
