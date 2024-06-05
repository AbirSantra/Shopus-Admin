import prismadb from "@/lib/prismadb";

export const getCustomerCont = async (storeId: string) => {
  const customerCount = await prismadb.customer.count({
    where: {
      storeId,
    },
  });

  return customerCount;
};
