"use client";

import { useRouter } from "next/navigation";
import { border, colors, size } from "../type/constants";

// 네비게이션 컴포넌트
export const Navbar: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div
                className={`flex items-center gap-5 p-2 ${border.borderBottom} ${colors.borderColor}`}
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
                <div>
                    <p
                        className="cursor-pointer"
                        onClick={() => {
                            router.push("/productPage");
                        }}
                    >
                        제품
                    </p>
                </div>
            </div>
        </>
    );
};
