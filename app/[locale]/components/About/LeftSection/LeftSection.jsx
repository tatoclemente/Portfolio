'use client'
import React from 'react'
import style from './LeftSection.module.css'

const LeftSection = ({ leftText, locale, contactClick }) => {
  const { hello, name, descriptionHeader, descriptionP1, descriptionP2, contactButton } = leftText;

  return (
    <section className={style.sectionLeftContainer}>
      <div className={style.titleContainer}>
        <div className={style.center}></div>
        <div className={style.centerRight}></div>
        <h1 className={`${style.heyTitle} ${locale === 'en' ? style.largeFont : ''}`}>{hello}</h1>
        <h1 className={style.nameTitle}>{name}</h1>
      </div>
      <div className={style.descriptionContainer}>
        <div className={style.lineContainer}>
          <div className={style.line}></div>
        </div>
        <h5 className={style.descriptionHeader}>{descriptionHeader}</h5>
        <div className={style.lineContainer}>
          <div className={style.lineRight}></div>
        </div>
        <p style={locale === 'en' ? { letterSpacing: '.9px' } : null} className={style.description}>{descriptionP1}</p>
        <p className={style.description}>{descriptionP2}</p>
        <div onClick={contactClick} className={style.button}>
          <span>{contactButton}</span>
        </div>
      </div>
    </section>
  )
}

export default LeftSection