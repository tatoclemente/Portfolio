import React from 'react'
import style from './LeftSection.module.css'
import Link from 'next/link'
const LeftSection = ({t, locale}) => {
  return (
    <>
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
          <span>{t('description.contact')}</span>
        </Link>
      </div>
    </>
  )
}

export default LeftSection