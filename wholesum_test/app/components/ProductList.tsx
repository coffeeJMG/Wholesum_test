"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { border, colors } from "../type/constants";

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

// 전체상품 페이지
export const ProductList = () => {
    const router = useRouter();
    const [productList, setProductList] = useState<Product[]>([]);

    // 페이지 최초 렌더링 시에 상품 목록조회
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get("/api/productList");
                // 반환된 상품 목록을 상태저장
                setProductList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductList();
    }, []);

    // 금액에 KRW 표시할 때 만단위마다 , 추가 함수
    function formatPrice(price: string): string {
        // 숫자를 문자열로 변환 후 한 자리씩 나눠 배열로 만듦
        const digits = price.split("");

        // 배열을 뒤집어서 마지막 세 자리부터 시작함
        const formattedArray = digits
            .reverse()
            .reduce<string[]>((acc, current, index) => {
                // 세 자리마다 쉼표 추가
                if (index % 3 === 0 && index !== 0) {
                    acc.push(",");
                }
                acc.push(current);
                return acc;
            }, []);

        // 배열을 다시 뒤집고 문자열로 합침
        return formattedArray.reverse().join("");
    }

    return (
        <div className="flex justify-center gap-4">
            {productList.map((product) => (
                <div key={product.id}>
                    <div
                        className={`${border.borderBottom} ${colors.borderColor}`}
                    >
                        <img
                            src={product.url}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="cursor-pointer"
                            onClick={() =>
                                router.push(`/detailPage/${product.id}`)
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        <p>{product.name}</p>
                        <p>{product.color}</p>
                    </div>
                    <p className="text-sm/[30px]">{product.descEn}</p>
                    <p className={`${colors.transparentTextColor}`}>
                        {product.descKr}
                    </p>
                    <p>KRW : {formatPrice(product.price)}</p>
                </div>
            ))}
        </div>
    );
};
