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
    } = body;

    // 새로운 유저 생성
    const product = await prisma.product.create({
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
