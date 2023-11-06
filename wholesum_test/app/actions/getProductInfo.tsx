import prisma from "@/app/libs/prismadb";

export default async function getProductInfo() {
    try {
        const productList = await prisma.product.findMany();

        return productList;
    } catch (error: any) {
        throw new Error(error);
    }
}
