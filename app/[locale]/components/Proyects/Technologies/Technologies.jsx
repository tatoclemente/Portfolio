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
import { Autoplay } from 'swiper/modules';
import { CldImage } from 'next-cloudinary';


const Technologies = () => {
  return (
    <div className={style.techContainer}>
    <h3>Stack</h3>
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      dynamicBullets={true}
      loop={true} // Esto hace que el carrusel sea infinito
      speed={25000} // Velocidad en milisegundos para cambiar de diapositiva
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 50,
        }
      }}
      modules={[Autoplay]}
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