'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from './Proyects.module.css'
import styleModal from './Modal.module.css'
import './swiper.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import CldImage from 'next/cloudinary';
import { CldImage } from 'next-cloudinary';


import Technologies from './Technologies/Technologies';
import Swal from 'sweetalert2'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import { TbWorldShare } from "react-icons/tb";



const Proyects = ({ proyectTexts, proyectsList }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState('TesloShop'); // Inicialmente selecciona 'El Festin'
  const [modalImageUrl, setModalImageUrl] = useState(''); // Estado para la URL de la imagen en el modal


  const swiperRef = useRef(null);

  useEffect(() => {
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


  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  }, [selectedTab]);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const openModal = (imageUrl) => {
    console.log(imageUrl);
    setModalImageUrl(imageUrl)
    // const modal = document.getElementById("myModal");
    // const modalImage = document.getElementById("modalImage");
    // modalImage.src = imageUrl;
    // modal.style.display = "block";
  };

  const closeModal = () => {
    setModalImageUrl('')
    // const modal = document.getElementById("myModal");
    // modal.style.display = "none";
  };

  const handleLinkClick = (link) => {
    isMobile && link.includes('https://pf-front-end-grupo3.vercel.app/') ?
      Swal.fire({
        icon: 'info',
        title: proyectTexts.alertTitle,
        text: proyectTexts.alertText,
        showDenyButton: true,
        confirmButtonText: proyectTexts.confirmButtonText,
        denyButtonText: proyectTexts.denyButtonText,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.open(link, "_blank");;
        } else if (result.isDenied) {
          return
        }
      })
      : window.open(link, "_blank");
    ;
  };

  return (
    <div className={style.mainContainer} id='projects'>
      <h1 className={style.title}>{proyectTexts.title}</h1>
      <header className={style.header}>
        <div
          className={`${style.titleProyectContainerSelect} ${selectedTab === 'TesloShop' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('TesloShop')}
        >
          <h3 className={style.titleProyect}>TesloShop</h3>
        </div>
        <div
          className={`${style.titleProyectContainerSelect} ${selectedTab === 'El Festin' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('El Festin')}
        >
          <h3 className={style.titleProyect}>El Festín</h3>
        </div>
        <div
          className={`${style.titleProyectContainerSelect} ${selectedTab === 'Henry Food' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('Henry Food')}
        >
          <h3 className={style.titleProyect}>Henry Food</h3>
        </div>
      </header>
      <div className={style.proyectsContainer}>
        {proyectsList.filter((proyect) => proyect.title === selectedTab)
          .map((proyect, index) => (
            <article key={index}>
              <Swiper
                ref={swiperRef}
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
                navigation
                spaceBetween={10}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  }
                }}
                pagination={{ clickable: true }}
                className='swiper'
              >
                {proyect.images.map((image, index) => {
                  return (<SwiperSlide key={index}>
                    <CldImage onClick={() => openModal(image)}
                      as="image"
                      className={style.swiperImage}
                      src={image}
                      alt='phProyect'
                      width={580}
                      height={300} />
                  </SwiperSlide>
                  )
                })}
              </Swiper>

              <div className={style.descriptionContainer}>
                <div className={style.buttonContainer}>
                  <p className={style.description}>{proyect.description}</p>
                </div>
                <div className={style.buttonContainer}>
                  <button onClick={(() => handleLinkClick(proyect.link))} className={style.buttonLink} target='_blank'>
                    <TbWorldShare size={24} /> {proyectTexts.button}
                  </button>
                  <Link href={proyect.githubLink} target='_blank' className={style.buttonLink} >
                    <BsGithub size={21} /> {proyectTexts.gitHubButton}
                  </Link> 
                </div>
              </div>

            </article>
          ))}
        {modalImageUrl !== '' &&
          <div className={styleModal.modal}>
            <div className={styleModal.modalContent}>
              <span className={styleModal.close} onClick={closeModal}>x</span>
              <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={200}>
                <TransformComponent>
                  <CldImage id="modalImage" src={modalImageUrl} as="image" className={styleModal.modalImage} alt='phProyect' width={isMobile ? 600 : 1150} height={isMobile ? 190 : 550} />
                </TransformComponent>

              </TransformWrapper>
            </div>
          </div>
        }


      </div>
      <Technologies />

      <svg className={style.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path className={style.wavePath} fill="#eefbfe" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
  )
}

export default Proyects