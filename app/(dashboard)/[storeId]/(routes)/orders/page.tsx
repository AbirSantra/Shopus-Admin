import OrderClient from "@/components/orders/order-client";
import { OrderColumns } from "@/components/orders/order-column";
import OrderHeader from "@/components/orders/order-header";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumns[] = orders.map((item) => ({
    id: item.id,
    customer: item.customer.name,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1">
      <OrderHeader />
      <OrderClient data={formattedOrders} />
    </div>
  );
};
export default OrdersPage;
