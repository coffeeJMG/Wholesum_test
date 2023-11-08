import { IParams, getProductId } from "../../../app/actions/getProductId";
import { ProductDetail } from "./ProductDetail";

// 상품 디테일 페이지 라우팅
const DetailPage = async ({ params }: { params: IParams }) => {
    // query string에서 상품 ID값 반환하는 함수 호출
    const product = await getProductId(params);

    if (!product) {
        return null;
    }

    return (
        <>
            <ProductDetail product={product} />
        </>
    );
};

export default DetailPage;
