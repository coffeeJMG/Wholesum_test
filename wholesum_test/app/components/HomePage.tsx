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
                    <div>
                        <img src="https://pottery33300.cafe24.com/main_bnr/231010/1-2.png" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src="https://pottery33300.cafe24.com/main_bnr/230922/21.png" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};
