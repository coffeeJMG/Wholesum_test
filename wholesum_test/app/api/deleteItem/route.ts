import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request: Request) {
    const body = await request.json();

    const { id } = body;

    // 해당 아이디 product 삭제

    await prisma.product.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json("유저 삭제성공");
}
