'use client'
import React from 'react'
import style from './Proyects.module.css'
import { elFestin, piFood } from '@/app/assets/iamgeUrls'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';


const Proyects = () => {
  const proyectsList = [
    {
      title: 'El Festin',
      images: elFestin,
      description: 'Proyecto Final del bootcamp soy Henry',
      link: 'https://pf-front-end-grupo3.vercel.app/',
    },
    {
      title: 'Henry Food',
      images: piFood,
      description: 'Proyecto Individual del bootcamp soy Henry',
      link: 'https://pf-front-end-grupo3.vercel.app/',
    },
  ]
  return (
    <div className={style.mainContainer}>
      <h1 className={style.title}>Proyects</h1>
      <header className={style.header}>
        <div className={style.titleProyectContainerSelect}>
          <h3 className={style.titleProyect}>El Festin</h3>
        </div>
        <div className={style.titleProyectContainer}>
          <h3 className={style.titleProyect}>Henry Food</h3>
        </div>
      </header>
      {proyectsList.map((proyect, index) => (
        <article key={index}>

          <div className={style.line}></div>

          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              }
            }}
            //  slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className={style.swiper}
          >
            {proyect.images.map((image, index) => {
              return <SwiperSlide key={index}><CldImage className={style.swiperImage} src={image} alt='phProyect' width={470} height={300} /></SwiperSlide>
            })}
          </Swiper>
          <p>{proyect.description} ingresa a ver el sitio aquí <Link href={proyect.link} rel="noreferrer">{proyect.title}</Link></p>
        </article>

      ))}

      <svg className={style.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path className={style.wavePath} fill="#eefbfe" fill-opacity="1" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
  )
}

export default Proyects