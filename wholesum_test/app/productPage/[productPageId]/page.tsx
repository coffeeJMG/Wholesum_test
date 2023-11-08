import { ProductList } from "../../../app/components/ProductList";

export interface CategoryParams {
    productPageId: string;
}

// 전체상품 페이지 라우팅
const ProductPage = async ({ params }: { params: CategoryParams }) => {
    const category = params.productPageId;

    return (
        <>
            <ProductList category={category}></ProductList>
        </>
    );
};

export default ProductPage;
