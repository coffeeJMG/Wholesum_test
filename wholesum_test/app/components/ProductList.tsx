"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { border, classPattern, colors, size } from "../type/constants";
import { updateProductStore } from "../stores/updateProductStore";
import { useEditItem } from "../hooks/useEditItemModal";
import useEditItemStore from "../stores/editItemInfoStore";

export interface Product {
    id: string;
    name: string;
    url: string;
    price: string;
    descKr: string;
    descEn: string;
    fit: string;
    thickness: string;
    color: string;
    size1: number;
    size2: number;
    size3: number;
    size4: number;
}

interface categoryProps {
    category: string;
}

// 전체상품 페이지
export const ProductList: React.FC<categoryProps> = ({ category }) => {
    const router = useRouter();
    const [productList, setProductList] = useState<Product[]>([]);
    const { updatedProductList, setUpdatedProductList } = updateProductStore();
    const { editId, setEditId } = useEditItemStore(); // 상태 업데이트 함수를 가져옵니다.

    const editItemModal = useEditItem();

    //페이지 최초 렌더링 시에 상품 목록조회
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                setUpdatedProductList(false);
                const response = await axios.post("/api/productList", {
                    category,
                });

                setProductList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductList();
    }, [updatedProductList]);

    // 상품 삭제 함수
    const handleDelete = async (productId: string) => {
        try {
            await axios.delete("/api/deleteItem", {
                data: { id: productId },
            });
            setUpdatedProductList(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (productId: string) => {
        setEditId(productId); // editId 상태를 업데이트합니다.
        editItemModal.onOpen(); // 모달을 엽니다.
    };

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
                    <div className="flex justify-between my-3">
                        <p className={`${size.basicSize}`}>size</p>
                        <div className="flex gap-1">
                            <div
                                className={`${
                                    product.size1 > 0
                                        ? classPattern.stockDiv
                                        : classPattern.nonStockDiv
                                }`}
                            >
                                {product.size1}
                            </div>
                            <div
                                className={`${
                                    product.size2 > 0
                                        ? classPattern.stockDiv
                                        : classPattern.nonStockDiv
                                }`}
                            >
                                {product.size2}
                            </div>
                            <div
                                className={`${
                                    product.size3 > 0
                                        ? classPattern.stockDiv
                                        : classPattern.nonStockDiv
                                }`}
                            >
                                {product.size3}
                            </div>
                            <div
                                className={`${
                                    product.size4 > 0
                                        ? classPattern.stockDiv
                                        : classPattern.nonStockDiv
                                }`}
                            >
                                {product.size4}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-5">
                        <button
                            className={`${border.borderBottom} ${colors.textColor} p-2`}
                            onClick={() => handleEdit(product.id)} // onClick에 handleEdit 함수를 연결합니다.
                        >
                            수정하기
                        </button>
                        <button
                            className={`${border.borderBottom} ${colors.textColor} p-2`}
                            onClick={() => handleDelete(product.id)}
                        >
                            삭제하기
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
