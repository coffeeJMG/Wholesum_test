"use client";

interface Product {
    id: string;
    name: string;
    url: string;
    price: string;
    descKr: string;
    descEn: string;
    fit: string;
    thickness: string;
    color: string;
}

interface ProductProps {
    product: Product;
}

export const ProductDetail: React.FC<ProductProps> = ({ product }) => {
    if (!product) {
        return null;
    }
    return (
        <>
            <div className="flex-col w-1/4 mx-auto mt-3">
                <p className="text-center text-2xl">{product.name}</p>
                <p className="text-center">{product.descEn}</p>
                <div className="flex justify-center">
                    <img src={product.url} width={400} height={400} />
                </div>

                <div className="flex justify-center border-2 border-neutral-600">
                    웹 개발자가 필요한 이유는
                </div>
            </div>
        </>
    );
};
