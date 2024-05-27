import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    if (!params.customerId) {
      return new NextResponse("Missing param: customerId", { status: 400 });
    }

    const customer = await prismadb.customer.findUnique({
      where: {
        id: params.customerId,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[CUSTOMER-GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; customerId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, email, phone, address } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing field: name", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Missing field: email", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Missing field: address", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Missing field: phone", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    if (!params.customerId) {
      return new NextResponse("Missing param: customerId", { status: 400 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const customer = await prismadb.customer.updateMany({
      where: {
        id: params.customerId,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[CUSTOMER-PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; customerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    if (!params.customerId) {
      return new NextResponse("Missing param: customerId", { status: 400 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const customer = await prismadb.customer.deleteMany({
      where: {
        id: params.customerId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[CUSTOMER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
