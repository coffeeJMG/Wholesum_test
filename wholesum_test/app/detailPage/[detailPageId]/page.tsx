import { IParams, getProductId } from "@/app/actions/getProductId";
import { ProductDetail } from "./ProductDetail";

const DetailPage = async ({ params }: { params: IParams }) => {
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
