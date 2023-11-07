import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export interface IParams {
    detailPageId: string;
}

// 전체상품 목록 조회 api
export async function POST(request: Request) {
    const body = await request.json();
    const { category } = body; // body에서 category 추출

    try {
        // product의 category 필드가 body의 category 값과 일치하는 상품만 조회
        const productList = await prisma.product.findMany({
            where: {
                category: category, // 여기서 category는 body로부터 받은 값입니다.
            },
        });

        // 상품 목록을 반환

        return NextResponse.json(productList);
    } catch (error: any) {
        throw new Error(error);
    }
}
