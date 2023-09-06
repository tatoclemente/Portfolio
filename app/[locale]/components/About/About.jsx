import React from 'react'
import style from './About.module.css'

import ph from '@/public/images/ph-portfolio.webp'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'


const About = ({ t }) => {
  const locale = useLocale()
  return (
    <div className={style.AboutContainer}>
      <section className={style.sectionLeft}>
        <div className={style.titleContainer}>
          <div className={style.center}></div>
          <div className={style.centerRight}></div>
          <h1 className={`${style.heyTitle} ${locale === 'en' ? style.largeFont : ''}`}>{t("hello")}</h1>
          <h1 className={style.nameTitle}>{t('name')}</h1>
        </div>
        <div className={style.descriptionContainer}>
          <div className={style.lineContainer}>
            <div className={style.line}></div>
          </div>
          <h5 className={style.descriptionHeader}>{t('description.header')}</h5>
          <div className={style.lineContainer}>
            <div className={style.lineRight}></div>
          </div>
          <p style={locale === 'en' ? { letterSpacing: '.9px' } : null} className={style.description}>{t('description.p1')}</p>
          <p className={style.description}>{t('description.p2')}</p>
          <Link href="#" className={style.button}>
            {t('description.contact')}
          </Link>
        </div>
      </section>
      <section className={style.sectionRight}>
        <div className={style.boobleBackLeft}></div>
        <div className={style.boobleBackRight}></div>
        <Image className={style.image} src={ph} alt="ph-portfolio" />
      </section>
    </div>
  )
}

export default About