import React from "react";

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

export const SignInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, onBlur, name, placeholder, small, value, form }, ref) => {
        return (
            <>
                <input
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    placeholder={placeholder}
                    className="border-0 border-b-2 border-solid border-neutral-600 w-full p-3"
                    type="text"
                />
            </>
        );
    },
);
