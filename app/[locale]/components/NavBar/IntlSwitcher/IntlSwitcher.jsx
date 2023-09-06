'use client'
import Link from 'next-intl/link'
import React, { useState } from 'react'
import style from './IntlSwitcher.module.css'
import { AiOutlineGlobal } from 'react-icons/ai'

const IntlSwitcher = ({locale}) => {
  const [show, setShow] = useState(false)
  return (
    <div className={style.mainContainer}>
      <AiOutlineGlobal onClick={() => setShow(!show)} className={style.global} />
      <div style={show === false ? { display: 'none' } : {}} className={style.linksContainer}>
      <Link className={locale === 'en' ? style.active : style.inactive} href='/' locale='en'>
        EN
      </Link>
      <Link className={locale === 'es' ? style.active : style.inactive} href='/' locale='es'>
        ES
      </Link>
      </div>
    </div>
  )
}

export default IntlSwitcher