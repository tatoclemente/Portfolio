import React from 'react'
import style from './Footer.module.css'
import { useTranslations } from 'next-intl'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import Link from 'next/link'
const Footer = () => {
  const t = useTranslations('NavBar') 
  return (
    <div className={style.footerContainer}>
          <div className={style.socialMedia}>
          <Link href="https://www.github.com/tatoclemente/" rel="noreferrer" className={style.github}>
            <BsGithub className={style.github} />
          </Link>
          <Link href="https://www.linkedin.com/in/tatoclemente/" rel="noreferrer">
            <BsLinkedin className={style.linkedin} />
          </Link>
        </div>
        <div className={style.footer}>
          <p>© 2023 Gustavo Clemente</p>
          <p>{t('AllRight')}</p>
        </div>
    </div>
  )
}

export default Footer