"use client";

import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center gap-5 p-2 border-b-2 border-neutral-600">
                <div className="justify-self-center ml-10">
                    <p
                        className={`text-3xl cursor-pointer`}
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
