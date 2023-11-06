import prisma from "@/app/libs/prismadb";

export interface IParams {
    detailPageId: string;
}

export const getProductId = async (params: IParams) => {
    try {
        const { detailPageId } = params;

        const product = await prisma.product.findUnique({
            // productId 와 일치하는 값을 product 의 id필드에서 찾는다
            where: {
                id: detailPageId,
            },

            // 포함해야하는 정보들
            select: {
                id: true,
                name: true,
                url: true,
                price: true,
                descKr: true,
                descEn: true,
                fit: true,
                thickness: true,
                color: true,
            },
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};
