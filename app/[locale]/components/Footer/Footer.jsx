import React from 'react'
import style from './Footer.module.css'

import { BsGithub, BsLinkedin } from 'react-icons/bs'
import Link from 'next/link'
const Footer = () => {

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
        <p>© 2024 Gustavo Clemente</p>
      </div>
    </div>
  )
}

export default Footer