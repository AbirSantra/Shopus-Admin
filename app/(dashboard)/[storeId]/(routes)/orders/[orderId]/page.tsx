import OrderForm from "@/components/orders/order-form";
import OrderPageHeader from "@/components/orders/order-page-header";
import prismadb from "@/lib/prismadb";

const OrderPage = async ({
  params,
}: {
  params: { storeId: string; orderId: string };
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const customers = await prismadb.customer.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-1">
      <OrderPageHeader initialData={order} />
      <OrderForm
        initialData={order}
        customers={customers}
        products={products}
      />
    </div>
  );
};
export default OrderPage;
