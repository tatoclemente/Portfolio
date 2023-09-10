'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { technology } from '@/app/assets/iamgeUrls';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './Technologies.module.css'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { CldImage } from 'next-cloudinary';


const Technologies = () => {
  return (
    <div className={style.techContainer}>
    <Swiper
      slidesPerView={6}
      spaceBetween={100}
      pagination={{
        clickable: true,
      }}
      dynamicBullets={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={false}
      modules={[Pagination, Navigation, Autoplay]}
      className={style.swiper}
    >
    {technology.map((tech, index) => (
        <SwiperSlide key={index} className={style.swiperSlide}>
             <CldImage className={style.swiperImage}  src={tech.image} alt='phProyect' width={100} height={100} />
             <span>{tech.title}</span>
        </SwiperSlide>
    ))}
    </Swiper>
  </div>
  )
}

export default Technologies