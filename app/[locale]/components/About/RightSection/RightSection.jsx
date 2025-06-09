'use client'
import React, { useEffect, useState } from 'react'
import style from './RightSection.module.css'
import ph from '@/public/images/ph-portfolio.webp'
import Image from 'next/image'
import Atropos from 'atropos/react'

const RightSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stylesClick, setStylesClick] = useState({
    imageMobile: '',
    bobbleLeft: '',
    bobbleRight: '',
  });


  useEffect(() => {
    // Verifica si la ventana tiene un ancho menor o igual a 768px 
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    // Ejecutar la función al cargar la página y en cambios de tamaño de ventana
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const hadleStylesClick = () => {
    stylesClick.imageMobile === '' 
    ? setStylesClick({
      ...stylesClick, 
      imageMobile : style.imageClick,
      bobbleLeft : style.bobbleLeftClick,
      bobbleRight : style.bobbleRightClick,
    }) 
    : setStylesClick({
      ...stylesClick, 
      imageMobile: '',
      bobbleLeft: '',
      bobbleRight: '',
    });
  }

  return (
    <>
      {isMobile ? (
        // Renderizar contenido sin Atropos.js en dispositivos móviles
        <div className={style.atropos} onClick={hadleStylesClick}>
          <div className={`${stylesClick.bobbleLeft} ${style.bobbleLeftMobile}`}></div>
          <div className={`${stylesClick.bobbleRight} ${style.bobbleRightMobile}`}></div>
          <Image 
            className={`${stylesClick.imageMobile} ${isMobile && style.imageMobile}`} 
            priority={true} 
            as="image" 
            src={ph} 
            alt="ph-portfolio" 
          />
        </div>
      ) : (
        // Renderizar contenido con Atropos.js en dispositivos no móviles
        <Atropos
         className={style.atropos}>
          <div className={style.bobbleBackLeft}></div>
          <div className={style.bobbleBackRight}></div>
          <Image data-atropos-offset="-5"  priority={true}  className={style.image} as="image" src={ph} alt="ph-portfolio" />
        </Atropos>
      )}
    </>
  )
}

export default RightSection