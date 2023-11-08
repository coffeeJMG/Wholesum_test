"use client";

import { Modal } from "./Modal";
import {
    Controller,
    SubmitHandler,
    useForm,
    FieldValues,
} from "react-hook-form";
import ReactSelect, { StylesConfig } from "react-select";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SignInput } from "../Input";
import { useAddItem } from "@/app/hooks/useAddItemModal";
import { useState } from "react";
import { updateProductStore } from "@/app/\bstores/updateProductStore";

// react-select 라이브러리 커스텀
const personnelSelectStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        width: "100%",
    }),
    option: (styles) => {
        return {
            ...styles,
            width: "90%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "5%",
        };
    },
    control: (provided) => ({
        ...provided,
        width: "600px",
        borderRadius: "5px",
    }),
    singleValue: (styles) => {
        return {
            ...styles,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
    },
};

const AddItemModal = () => {
    const newAddItemModal = useAddItem(); // 상품추가 모달 생성,종료 함수담은 변수 전역상태관리
    const [file, setFile] = useState<File | null>(null); // 이미지 파일 상태관리
    const { setUpdatedProductList } = updateProductStore(); // 상품 목록의 변화 전역상태관리

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            url: "",
            price: "",
            descKr: "",
            descEn: "",
            fit: "",
            thickness: "",
            color: "",
            category: "",
            size1: 0,
            size2: 0,
            size3: 0,
            size4: 0,
            ReactSelect: { value: "", label: "카테고리" },
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let uploadedImageUrl = "";

        if (file) {
            try {
                // S3 파일 업로드
                const filename = encodeURIComponent(file.name); // 사진 업로드시에 상태에 저장된 파일 이름 인코딩

                // 업로드 데이터 요청 후 반환받는 api요청
                const { data: imageData } = await axios.post("/api/image", {
                    filename,
                });
                const formData = new FormData();

                // 위 요청으로 반환받은 데이터를 통해 formData에 필요한 필드들 추가
                Object.entries({ ...imageData.fields, file: file }).forEach(
                    ([key, value]) => {
                        if (
                            typeof value === "string" ||
                            value instanceof Blob
                        ) {
                            formData.append(key, value);
                        } else {
                            console.error(
                                "formData.append: value타입을 확인해주세요",
                                value,
                            );
                        }
                    },
                );

                // S3 Presigned URL로 파일 업로드 (db에 연결할 이미지 URL 생성하는 api호출)
                const response = await fetch(imageData.url, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("File upload failed");
                }

                // 성공적으로 업로드되면 이미지 URL을 설정합니다.
                // 기본 url 은 단순 aws bucket 이므로 설정한 업로드 파일의 이름을 붙힌다.
                uploadedImageUrl =
                    imageData.url + "/" + encodeURIComponent(filename);
            } catch (error) {
                console.error("Error during file upload:", error);
                return; // 파일 업로드에 실패하면 여기서 함수를 종료합니다.
            }
        }

        // 상품 추가 로직
        try {
            // hook-form 으로 받은 데이터 + S3 이미지 경로를 합쳐 새로 생성될 product 더미데이터 생성
            const postData = {
                ...data,
                url: uploadedImageUrl, // S3에 업로드된 이미지 URL 사용
                category: data.ReactSelect.value,
            };

            // 여기서 서버로 상품 추가 요청을 보냅니다.
            const response = await axios.post("/api/addItem", postData);
            setUpdatedProductList(true);
            newAddItemModal.onClose();
            reset({
                name: "",
                url: "",
                price: "",
                descKr: "",
                descEn: "",
                fit: "",
                thickness: "",
                color: "",
                category: "",
                size1: 0,
                size2: 0,
                size3: 0,
                size4: 0,
                ReactSelect: { value: "", label: "카테고리" },
            });
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const bodyContent = (
        <>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("name", {
                            required: "상품명을 입력해주세요",
                        })}
                        placeholder="상품명을 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("price", {
                            required: "가격을 입력해주세요",
                        })}
                        placeholder="가격을 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("descEn", {
                            required: "영어 설명을 입력해주세요",
                        })}
                        placeholder="영어 설명을 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("descKr", {
                            required: "한글 설명을 입력해주세요",
                        })}
                        placeholder="한글 설명을 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("fit", {
                            required: "핏을 입력해주세요",
                        })}
                        placeholder="핏을 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("thickness", {
                            required: "두께를 입력해주세요",
                        })}
                        placeholder="두께를 입력해주세요"
                    />
                </div>
                <div className="flex flex-row items-center gap-10">
                    <SignInput
                        {...register("color", {
                            required: "색상을 입력해주세요",
                        })}
                        placeholder="색상을 입력해주세요"
                    />
                </div>
                <div className="grid grid-cols-4 gap-1">
                    <div className="flex flex-row items-center ">
                        <SignInput
                            {...register("size1", {
                                required: "사이즈 1",
                                setValueAs: (value) => parseInt(value, 10),
                            })}
                            placeholder="사이즈 1"
                        />
                    </div>
                    <div className="flex flex-row items-center ">
                        <SignInput
                            {...register("size2", {
                                required: "사이즈 2",
                                setValueAs: (value) => parseInt(value, 10),
                            })}
                            placeholder="사이즈 2"
                        />
                    </div>
                    <div className="flex flex-row items-center ">
                        <SignInput
                            {...register("size3", {
                                required: "사이즈 3",
                                setValueAs: (value) => parseInt(value, 10),
                            })}
                            placeholder="사이즈 3"
                        />
                    </div>
                    <div className="flex flex-row items-center ">
                        <SignInput
                            {...register("size4", {
                                required: "사이즈 4",
                                setValueAs: (value) => parseInt(value, 10),
                            })}
                            placeholder="사이즈 4"
                        />
                    </div>
                </div>
                <input
                    {...register("url", {
                        required: "category",
                    })}
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                            // 클라이언트에서 업로드한 파일 이름 상태저장 (추후 S3 bucket 이름으로도 사용)
                            setFile(e.target.files[0]);
                        }
                    }}
                />
                <div className="flex w-full">
                    <div>
                        <Controller
                            render={({ field }) => (
                                <ReactSelect
                                    styles={personnelSelectStyles}
                                    {...field}
                                    options={[
                                        { value: "shirts", label: "shirts" },
                                        { value: "denim", label: "denim" },
                                    ]}
                                    isClearable={false}
                                    isSearchable={false}
                                    instanceId="newScheduleId"
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="ReactSelect"
                            control={control}
                        />
                    </div>
                </div>

                <button>상품 추가하기</button>
            </form>
        </>
    );

    return (
        <>
            <Modal
                isOpen={newAddItemModal.isOpen}
                title="상품 추가하기"
                onClose={newAddItemModal.onClose}
                body={bodyContent}
            />
        </>
    );
};

export default AddItemModal;
