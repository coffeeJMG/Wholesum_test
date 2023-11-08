"use client";

import { colors } from "../../../app/type/constants";

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

    //props로 받은 정보를 바탕으로 렌더링
    return (
        <>
            <div className="flex-col w-1/2 mx-auto mt-3">
                <p className="text-center text-2xl">{product.name}</p>
                <p className="text-center">{product.descEn}</p>
                <div className="flex justify-center">
                    <img src={product.url} width={400} height={400} />
                </div>

                <div
                    className={`flex justify-center border-2 ${colors.textColor} flex-col`}
                >
                    <p className="text-4xl">
                        웹 개발자의 필요성은 즉시 대응이 가능한 점이라고
                        생각합니다.
                    </p>
                    <p className="text-xl">
                        고객, 팀 피드백이 있을 때 바로 진행할 수 있고,
                        아이디어를 반영하거나 새로운 아이디어가 현재 적용이
                        불가능하면 어떻게 적용할 수 있는지에 대한 계획도
                        사내에서 협업할 수 있으며 더 나아가 내가 가진 상품이기에
                        일단 작동하면 그만이 아닌 장기적인 관점에서 일을 진행할
                        수 있습니다. 고객을 상대하는 일은 시간 싸움이기 때문에
                        사내 개발자는 이 싸움에서 이기는 방법이라고 생각합니다.
                    </p>

                    <p className="text-xl">
                        마지막으로 사내 개발자는 나의 성장과 성과를 높이기 위해
                        타사의 웹을 보며 장점, 단점들을 파악하며 공부해 나갈
                        것이고 일반적으로 좋은 UX/UI 란 고객들이 이용하면서
                        어색하지 않음에서 출발합니다. 디자인 팀과의 협업으로
                        우리의 웹이 처음 온 사람들도 어색해하지 않는 완성도 있는
                        웹으로 바뀔 것입니다.
                    </p>
                </div>
            </div>
        </>
    );
};
