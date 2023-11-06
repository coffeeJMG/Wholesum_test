import getProductInfo from "./actions/getProductInfo";
import { ProductList } from "./components/ProductList";

export default async function Home() {
    const productList = await getProductInfo();
    return <ProductList productList={productList} />;
}
