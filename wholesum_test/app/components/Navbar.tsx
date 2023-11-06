"use client";

import { useRouter } from "next/navigation";
import { CgSandClock } from "react-icons/cg";

export const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between p-8 mt-3 border-b-2 border-neutral-600">
                <div className="justify-self-center">
                    <p className={`text-3xl cursor-pointer`}>POTTERY</p>
                </div>

                {/* <div className="flex justify-end gap-3 items-center flex-row">
                    <div className="flex flex-row gap-1">
                        <p
                            className="cursor-pointer pb-2"
                            onClick={() => router.push("/login")}
                        >
                            로그인
                        </p>
                    </div>
                </div> */}
            </div>
        </>
    );
};
