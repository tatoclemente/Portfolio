'use client'

import React, { useRef, useState, useEffect } from 'react'

import { technology } from '@/app/assets/iamgeUrls';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './Technologies.module.css'

import { CldImage } from 'next-cloudinary';


const Technologies = () => {
  const frontCarouselRef = useRef(null); // Referencia al contenedor del carrusel frontal
  const backCarouselRef = useRef(null); // Referencia al contenedor del carrusel trasero

  const { front, back } = technology;
  const [clonedTechnologyFront, setClonedTechnologyFront] = useState([...front]);
  const [clonedTechnologyBack, setClonedTechnologyBack] = useState([...back]);
  let isDragging = false
 
  let startX; // Posición X inicial del mouse
  let scrollLeft; // Posición de desplazamiento izquierda inicial del carrusel

  const handleMouseDownFront = (e) => {
    isDragging = true;
    startX = e.pageX - frontCarouselRef.current.offsetLeft;
    scrollLeft = frontCarouselRef.current.scrollLeft;
  };
  const handleMouseDownBack = (e) => {
    isDragging = true;
    startX = e.pageX - backCarouselRef.current.offsetLeft;
    scrollLeft = backCarouselRef.current.scrollLeft;
  };


  const handleMouseMoveFront = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - frontCarouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para ajustar la velocidad del desplazamiento
    frontCarouselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseMoveBack = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - backCarouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para ajustar la velocidad del desplazamiento
    backCarouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleTouchStartFront = (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - frontCarouselRef.current.offsetLeft;
    scrollLeft = frontCarouselRef.current.scrollLeft;
  };
  const handleTouchStartBack = (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - backCarouselRef.current.offsetLeft;
    scrollLeft = backCarouselRef.current.scrollLeft;
  };

  const handleTouchMoveFront = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - frontCarouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    frontCarouselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchMoveBack = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - backCarouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    backCarouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  useEffect(() => {
    // Clona los elementos del principio y al final del carrusel para el efecto infinito
    const clonedFront = [...front, ...front, ...front];
    const clonedBack = [...back, ...back, ...back];
    setClonedTechnologyFront(clonedFront);
    setClonedTechnologyBack(clonedBack);
  }, [back, front]);


  return (
    <div className={style.techContainer}>
      <h3>Stack</h3>
      <div
        ref={frontCarouselRef} // Asigna la referencia al contenedor del carrusel
        onMouseDown={handleMouseDownFront}
        onMouseMove={handleMouseMoveFront}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStartFront}
        onTouchMove={handleTouchMoveFront}
        onTouchEnd={handleTouchEnd}
        className={style.carouselContainer}
      >
        {clonedTechnologyFront.map((tech, index) => (
          <div
            key={index}
            className={style.carousel}
          >
            <CldImage
              className={style.carouselLogo}
              as="image"
              src={tech.image}
              alt='phProyect'
              width={100}
              height={100}
              onClick={(e) => e.stopPropagation()} 
            />
            <span>{tech.title}</span>
          </div>
        ))}
        
      </div>
      <div
        ref={backCarouselRef} // Asigna la referencia al contenedor del carrusel
        onMouseDown={handleMouseDownBack}
        onMouseMove={handleMouseMoveBack}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStartBack}
        onTouchMove={handleTouchMoveBack}
        onTouchEnd={handleTouchEnd}
        className={style.carouselContainer}
      >
      {clonedTechnologyBack.map((tech, index) => (
          <div
            key={index}
            className={style.carouselBack}
          >
            <CldImage
              className={style.carouselLogo}
              src={tech.image}
              as="image"
              alt='phProyect'
              width={100}
              height={100}
              onClick={(e) => e.stopPropagation()} 
            />
            <span>{tech.title}</span>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Technologies