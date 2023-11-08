import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        url,
        name,
        price,
        descKr,
        descEn,
        thickness,
        color,
        category,
        size1,
        size2,
        size3,
        size4,
        fit,
        id,
    } = body;

    console.log(id);
    // id 값과 일치하는 상품 찾아서 업데이트
    const product = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            url,
            name,
            price,
            descKr,
            descEn,
            thickness,
            color,
            category,
            size1,
            size2,
            size3,
            size4,
            fit,
        },
    });

    return NextResponse.json(product);
}
