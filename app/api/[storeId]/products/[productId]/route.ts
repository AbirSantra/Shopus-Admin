import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Missing param: productId", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    const { name, price, categoryId, images, isFeatured, isArchived } =
      await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing field: name", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Missing field: images", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Missing field: price", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Missing field: categoryId", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Missing param: productId", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing param: storeId", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Missing param: billboardId", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
