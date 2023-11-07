import React from "react";
import { border, colors } from "../type/constants";

export interface InputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
    small?: boolean;
    value?: string;
    form?: boolean;
}

// 공통 인풋 UI 기본 적인 설정에 필요시에 따라 props를 추가하여 해당 컴포넌트에서 사용
export const SignInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, onBlur, name, placeholder }, ref) => {
        return (
            <>
                <input
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    placeholder={placeholder}
                    className={`border-0 ${border.borderBottom} border-solid ${colors.borderColor} w-full p-3`}
                    type="text"
                />
            </>
        );
    },
);
