'use client'
import React, { useEffect, useState } from 'react'
import style from './Proyects.module.css'
import styleModal from './Modal.module.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper.css'
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Technologies from './Technologies/Technologies';



const Proyects = ({ title, buttonLink, proyectsList }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState('El Festin'); // Inicialmente selecciona 'El Festin'

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const openModal = (imageUrl) => {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageUrl;
    modal.style.display = "block";
  };
  
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };
  

  return (
    <div className={style.mainContainer} id='proyects'>
      <h1 className={style.title}>{title}</h1>
      <header className={style.header}>
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
        <div
          className={`${style.titleProyectContainerSelect} ${selectedTab === 'Rick And Morty' ? style.selectedTab : ''
            }`}
          onClick={() => handleTabClick('Rick And Morty')}
        >
          <h3 className={style.titleProyect}>Rick And Morty</h3>
        </div>
      </header>
      <div className={style.proyectsContainer}>
        {proyectsList.filter((proyect) => proyect.title === selectedTab)
          .map((proyect, index) => (
            <article key={index}>
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
                            <CldImage onClick={() => openModal(image)} className={style.swiperImage} src={image} alt='phProyect' width={580} height={300} />
                          </SwiperSlide>
                          )
                })}
              </Swiper>

              <div className={style.descriptionContainer}>
                <p>{proyect.description}</p>
                <Link className={style.buttonLink} target='_blank' href={proyect.link} rel="noreferrer">{buttonLink}</Link>
              </div>

            </article>
          ))}
        <div id="myModal" className={styleModal.modal}>
          <div className={styleModal.modalContent}>
            <span className={styleModal.close} onClick={closeModal}>x</span>
            <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={200}>
              <TransformComponent>
                <CldImage id="modalImage" className={styleModal.modalImage} alt='phProyect' width={isMobile ? 600 : 1150} height={isMobile ? 200 : 550} />
              </TransformComponent>

            </TransformWrapper>
          </div>
        </div>

      </div>
      <Technologies />

      <svg className={style.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path className={style.wavePath} fill="#eefbfe" fill-opacity="1" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
  )
}

export default Proyects