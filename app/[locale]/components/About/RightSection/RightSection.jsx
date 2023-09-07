import React from 'react'
import style from './RightSection.module.css'
import ph from '@/public/images/ph-portfolio.webp'
import Image from 'next/image'
const RightSection = () => {
  return (
    <>
      <div className={style.boobleBackLeft}></div>
      <div className={style.boobleBackRight}></div>
      <Image className={style.image} src={ph} alt="ph-portfolio" />
    </>
  )
}

export default RightSection