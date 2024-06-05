import prismadb from "@/lib/prismadb";

export const getTotalProducts = async (storeId: string) => {
  const totalProducts = await prismadb.product.count({
    where: {
      storeId,
    },
  });

  return totalProducts;
};
