"use client";

import { useRouter } from "next/navigation";
import { border, colors, size } from "../type/constants";
import { useMemo, useCallback, useState } from "react";

// 네비게이션 컴포넌트
export const Navbar: React.FC = () => {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);

    //최적화를 위해 useMemo 사용
    const dropdownClasses = useMemo(() => {
        return `absolute w-full overflow-hidden z-10 transition-all duration-500 ease-out ${
            isHovering ? "max-h-full" : "max-h-0"
        }`;
    }, [isHovering]);

    return (
        <>
            <div
                className={`flex items-center gap-5 p-2 ${colors.borderColor}`}
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
                <div className="justify-self-center ml-10">
                    <p className="cursor-pointer">제품</p>
                </div>
            </div>
            <div
                className={dropdownClasses}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div
                    className={`p-2 ${colors.textColor} w-full border-neutral-200 border-2 grid grid-cols-5 gap-4 bg-white`}
                >
                    <div>
                        <p className="mb-3 text-xl">나중에 사용할 공간</p>
                    </div>

                    <div className="flex flex-col">
                        <p className="mb-3 text-xl">카테고리</p>
                        <p className="cursor-pointer inline-block self-start">
                            셔츠
                        </p>
                        <p className="cursor-pointer inline-block self-start">
                            데님
                        </p>
                    </div>

                    <div>
                        <p className="mb-3 text-xl">나중에 사용할 공간</p>
                    </div>
                    <div>
                        <p className="mb-3 text-xl">나중에 사용할 공간</p>
                    </div>
                    <div>
                        <p className="mb-3 text-xl">나중에 사용할 공간</p>
                    </div>
                </div>
            </div>
        </>
    );
};
