'use client'

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import style from './CarruselCards.module.css';
export default function CarruselCards() {
  return (
    <div className={style.container}>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={style.swiper}
      >
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide1}`}>Slide 1</span></SwiperSlide> 
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide2}`}>Slide 2</span></SwiperSlide> 
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide3}`}>Slide 3</span></SwiperSlide>
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide4}`}>Slide 4</span></SwiperSlide> 
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide5}`}>Slide 5</span></SwiperSlide>
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide6}`}>Slide 6</span></SwiperSlide>
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide7}`}>Slide 7</span></SwiperSlide>
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide8}`}>Slide 8</span></SwiperSlide>
        <SwiperSlide> <span className={`${style.swiperSlide} ${style.swiperSlide9}`}>Slide 9</span></SwiperSlide>
      </Swiper>
    </div>
  );
}
