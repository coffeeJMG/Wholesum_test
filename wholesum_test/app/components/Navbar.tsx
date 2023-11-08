"use client";

import { useRouter } from "next/navigation";
import { border, classPattern, colors, size } from "../type/constants";
import { memo, useState } from "react";
import { useAddItem } from "../hooks/useAddItemModal";

// 네비게이션 컴포넌트
const Navbar: React.FC = () => {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);
    const AddItemModal = useAddItem();
    //최적화를 위해 useMemo 사용

    return (
        <>
            <div
                className={`flex items-center gap-5 p-2 ${border.borderBottom} ${colors.borderColor}`}
                onMouseEnter={() => setIsHovering(true)}
            >
                <div className="justify-self-center ml-10">
                    <p
                        className={`${size.bannerSize} cursor-pointer`}
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        POTTERY
                    </p>
                </div>
                <div className="flex justify-self-center items-center gap-5 ml-10">
                    <p className="cursor-pointer">제품</p>
                </div>
            </div>
            <div
                className={`absolute w-full overflow-hidden z-10 transition-all duration-500 ease-out ${
                    isHovering ? "max-h-full" : "max-h-0"
                }`}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div
                    className={`p-2 ${colors.textColor} w-full border-neutral-200 border-2 border-t-0 grid grid-cols-5 gap-4 bg-white`}
                >
                    <div>
                        <p className={`${classPattern.subNavClass}`}>
                            나중에 사용할 공간
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p className={`${classPattern.subNavClass}`}>
                            카테고리
                        </p>
                        <p
                            className="cursor-pointer inline-block self-start"
                            onClick={() => router.push(`/productPage/shirts`)}
                        >
                            셔츠
                        </p>
                        <p
                            className="cursor-pointer inline-block self-start"
                            onClick={() => router.push(`/productPage/denim`)}
                        >
                            데님
                        </p>
                    </div>

                    <div>나중에 사용할 공간</div>
                    <div>
                        <p className={`${classPattern.subNavClass}`}>
                            나중에 사용할 공간
                        </p>
                    </div>
                    <div>
                        <p className={`${classPattern.subNavClass}`}>
                            관리자 기능
                        </p>

                        <p
                            className="cursor-pointer inline-block self-start"
                            onClick={AddItemModal.onOpen}
                        >
                            상품추가하기
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Navbar);
