import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export interface IParams {
    detailPageId: string;
}

export async function GET(req: Request) {
    try {
        const productList = await prisma.product.findMany();

        return NextResponse.json(productList);
    } catch (error: any) {
        throw new Error(error);
    }
}
