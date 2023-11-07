import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export interface IParams {
    detailPageId: string;
}

// 전체상품 목록 조회 api
export async function GET(req: Request) {
    try {
        // product의 모든 정보를 조회
        const productList = await prisma.product.findMany();

        // 상품 목록을 반환
        return NextResponse.json(productList);
    } catch (error: any) {
        throw new Error(error);
    }
}
