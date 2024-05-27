import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { OrderItem } from "@prisma/client";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const { customerId, isPaid, orderItems } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!customerId) {
      return new NextResponse("Missing field: customerId", { status: 400 });
    }

    if (!orderItems || !orderItems.length) {
      return new NextResponse("Missing field: orderItems", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const productIds = orderItems.map((item: OrderItem) => item.productId);

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: isPaid,
        customerId: customerId,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[PRODUCT-POST] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
