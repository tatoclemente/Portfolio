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
    boobleLeft: '',
    boobleRight: '',
  });


  useEffect(() => {
    // Verificar si la ventana tiene un ancho menor o igual a 768px (o el valor que desees para dispositivos móviles)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el valor según tus necesidades
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
      boobleLeft : style.boobleLeftClick,
      boobleRight : style.boobleRightClick,
    }) 
    : setStylesClick({
      ...stylesClick, 
      imageMobile: '',
      boobleLeft: '',
      boobleRight: '',
    });
  }

  return (
    <>
      {isMobile ? (
        // Renderizar contenido sin Atropos.js en dispositivos móviles
        <div className={style.atropos} onClick={hadleStylesClick}>
          <div className={`${stylesClick.boobleLeft} ${style.boobleLeftMobile}`}></div>
          <div className={`${stylesClick.boobleRight} ${style.boobleRightMobile}`}></div>
          <Image 
            width={500} 
            height={500} 
            priority={true}
            src={ph} alt="ph-portfolio" 
            className={`${stylesClick.imageMobile} ${isMobile && style.imageMobile}`} 
          />
        </div>
      ) : (
        // Renderizar contenido con Atropos.js en dispositivos no móviles
        <Atropos
         className={style.atropos}>
          <div className={style.boobleBackLeft}></div>
          <div className={style.boobleBackRight}></div>
          <Image 
            data-atropos-offset="-5"  
            width={500} 
            height={500}
            priority={true}  
            className={style.image} 
            src={ph} 
            alt="ph-portfolio" 
          />
        </Atropos>
      )}
    </>
  )
}

export default RightSection