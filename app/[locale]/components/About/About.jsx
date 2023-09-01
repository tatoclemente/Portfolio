import React from 'react'
import style from './About.module.css'

import ph from '@/public/images/ph-portfolio.webp'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'


const About = ({ t }) => {
  const locale = useLocale()
  return (
    <>
      <section className={style.sectionLeft}>
        <div className={style.titleContainer}>
          <h1 style={locale === 'es' ? { fontSize: '6.1rem' } : null} className={style.heyTitle}>{t("hello")}</h1>
          <h1 className={style.nameTitle}>{t('name')}</h1>
        </div>
        <div className={style.lineContainer}>
          <div className={style.line}></div>
        </div>
        <h5 className={style.descriptionHeader}>{t('description.header')}</h5>
        <div className={style.lineContainer}>
          <div className={style.lineRight}></div>
        </div>
        <p style={locale === 'en' ? {letterSpacing: '.9px'}: null} className={style.description}>{t('description.p1')}</p>
        <p className={style.description}>{t('description.p2')}</p>
        <Link href="#" className={style.button}>
          {t('description.contact')}
        </Link>
        {/* <p>{t.rich('richText', {
          important: (chunks) => <b>{chunks}</b>,
          very: (chunks) => <i>{chunks}</i>
        })}</p> */}
        {/* <div>
          <AlertMessage message={t("alertMessage")}/>
        </div> */}
      </section>
      <section className={style.sectionRight}>
        <div className={style.boobleBackLeft}></div>
        <div className={style.boobleBackRight}></div>
        <Image className={style.image} src={ph} alt="ph-portfolio" />
      </section>
    </>
  )
}

export default About