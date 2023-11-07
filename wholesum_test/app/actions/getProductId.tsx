import prisma from "@/app/libs/prismadb";

// prams로 상품의 ID 를 받아 해당 상품 정보 조회하는 코드
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

        // 찾은 데이터를 반환
        return {
            ...product,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};
