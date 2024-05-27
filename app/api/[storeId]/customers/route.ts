import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name, email, address, phone } = await req.json();

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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const customer = await prismadb.customer.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[CUSTOMERS-POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    const customers = await prismadb.customer.findMany({
      where: {
        storeId: params.storeId,
      },
    });
  } catch (error) {
    console.log("[CUSTOMERS-GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
