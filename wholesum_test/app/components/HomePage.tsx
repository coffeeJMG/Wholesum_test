"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export const HomePage = () => {
    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative">
                        <div>
                            <img src="https://pottery33300.cafe24.com/main_bnr/231010/1-2.png" />
                        </div>
                        <div className="absolute top-0 left-0 w-2/5 h-full text-background">
                            <div className="absolute top-1/4 left-0 z-10 p-4">
                                <p className="text-xl text-neutral-600">
                                    PRTY 하이라이트
                                </p>
                                <p className="text-5xl text-neutral-800">
                                    간절기에 유용할
                                </p>
                                <p className="text-5xl text-neutral-800">
                                    AW23 신상품
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <div>
                            <img src="https://pottery33300.cafe24.com/main_bnr/230922/21.png" />
                        </div>
                        <div className="absolute top-0 left-0 w-2/5 h-full text-background">
                            <div className="absolute top-1/4 left-0 z-10 p-4">
                                <p className="text-xl text-neutral-600">
                                    PRTY 인기제품
                                </p>
                                <p className="text-5xl text-neutral-800">
                                    편안한 일상을 위한
                                </p>
                                <p className="text-5xl text-neutral-800">
                                    컴포트 셔츠
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};
