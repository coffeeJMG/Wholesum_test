"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SignInput } from "./Input";

export interface LoginFormInput {
    email: string;
    password: string;
}

// 로그인페이지

const LoginForm = () => {
    const router = useRouter();

    // 로그인 된 유저라면 홈페이지로 이동
    // useEffect(() => {
    //     if (currentUser) {
    //         router.push("/homepage");
    //     }
    // }, [currentUser, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        try {
            const callback = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (callback?.ok) {
                router.push("/startPage");
                router.refresh();
            } else if (callback?.error) {
                if (callback.status !== 200) {
                    console.log(callback.error);
                }
                toast(callback.error);
            }
            reset({
                email: "",
                password: "",
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <div className="flex ">
                <div className="w-1/2 flex items-center justify-center">
                    <p>Account</p>
                </div>
                <div className="w-1/2 flex-col">
                    <div>
                        <SignInput placeholder="아이디" />
                    </div>
                    <div>
                        <SignInput placeholder="비밀번호" />
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>로그인</p>
                        <p>계정생성</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const Login = React.memo(LoginForm);

export default Login;
