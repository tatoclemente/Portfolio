'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from './Projects.module.css'
import styleModal from './Modal.module.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// Import Swiper styles
import './swiper.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { CldImage } from 'next-cloudinary';

import Technologies from './Technologies/Technologies';
import Swal from 'sweetalert2'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import { TbWorldShare } from "react-icons/tb";



const Projects = ({ projectTexts, projectsList }) => {
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
  };

  const closeModal = () => {
    setModalImageUrl('')
  };

  const handleLinkClick = (link) => {
    isMobile && link.includes('https://pf-front-end-grupo3.vercel.app/') ?
      Swal.fire({
        icon: 'info',
        title: projectTexts.alertTitle,
        text: projectTexts.alertText,
        showDenyButton: true,
        confirmButtonText: projectTexts.confirmButtonText,
        denyButtonText: projectTexts.denyButtonText,
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
      <svg className={style.waveTop} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className={style.wavePath} fill="#eefbfe" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      <h1 className={style.title}>{projectTexts.title}</h1>
      <header className={style.header}>
        <div
          className={`${style.titleProjectContainerSelect} ${selectedTab === 'TesloShop' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('TesloShop')}
        >
          <h3 className={style.titleProject}>TesloShop</h3>
        </div>
        <div
          className={`${style.titleProjectContainerSelect} ${selectedTab === 'El Festin' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('El Festin')}
        >
          <h3 className={style.titleProject}>El Festín</h3>
        </div>
        <div
          className={`${style.titleProjectContainerSelect} ${selectedTab === 'Henry Food' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('Henry Food')}
        >
          <h3 className={style.titleProject}>Henry Food</h3>
        </div>
      </header>
      <div className={style.projectsContainer}>
        {projectsList.filter((project) => project.title === selectedTab)
          .map((project, index) => (
            <article key={index}>
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                // grabCursor={true}
                // centeredSlides={true}
                slidesPerView={1}
                navigation
                spaceBetween={0}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  968: {
                    slidesPerView: 1.5,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 1.3,
                    spaceBetween: 5,
                  },
                  1080: {
                    slidesPerView: 1.5,
                    spaceBetween: 0,
                  },
                  1300: {
                    slidesPerView: 2.1,
                    spaceBetween: 2,
                  },
                  1550: {
                    slidesPerView: 2.3,
                    spaceBetween: 0,
                  }
                }}
                pagination={{ clickable: true }}
                className='swiper'
              >
                {project.images.map((image, index) => {
                  return (<SwiperSlide key={index}>
                    <CldImage 
                      onClick={() => openModal(image)}
                      as="image"
                      src={image}
                      alt='phProject'
                      lazyload="true"
                      width={580}
                      height={300}
                      className={style.projectImg}
                    />
                  </SwiperSlide>
                  )
                })}
              </Swiper>

              <div className={style.descriptionContainer}>
                <div className={style.buttonContainer}>
                  <p className={style.description}>{project.description}</p>
                </div>
                <div className={style.buttonContainer}>
                  <button onClick={(() => handleLinkClick(project.link))} className={style.buttonLink} target='_blank'>
                    <TbWorldShare size={24} /> {projectTexts.button}
                  </button>
                  <Link href={project.githubLink} target='_blank' className={style.buttonLink} >
                    <BsGithub size={21} /> {projectTexts.gitHubButton}
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
                  <CldImage 
                    id="modalImage" 
                    src={modalImageUrl} 
                    as="image" 
                    className={styleModal.modalImage} 
                    alt='phProject' 
                    width={isMobile ? 600 : 1150} 
                    height={isMobile ? 190 : 550}
                    lazyload="true"
                  />
                </TransformComponent>

              </TransformWrapper>
            </div>
          </div>
        }

      </div>
      <Technologies />


    </div>
  )
}

export default Projects