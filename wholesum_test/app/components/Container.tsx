"use client";

// 페이지 전체 크기
interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <>
            <div className="mx-auto px-4 w-full">{children}</div>
        </>
    );
};
