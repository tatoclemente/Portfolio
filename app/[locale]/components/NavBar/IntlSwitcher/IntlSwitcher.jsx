'use client'
import Link from 'next-intl/link'
import React, { useState } from 'react'
import Image from 'next/image'
import style from './IntlSwitcher.module.css'
import { AiOutlineGlobal } from 'react-icons/ai'

const IntlSwitcher = ({ locale }) => {
  const [show, setShow] = useState(false)
  return (
    <div className={style.mainContainer}>
      <AiOutlineGlobal onClick={() => setShow(!show)} className={style.global} />
      <div style={show === false ? { display: 'none' } : {}} className={style.linksContainer}>
        <Link className={locale === 'en' ? style.active : style.inactive} href='/' locale='en'>

          <Image
            width={30}
            height={25}
            alt="usa flag"
            src="/images/united_states.png"
            className={ style.flag }
          />
          EN
        </Link>
        <Link className={locale === 'es' ? style.active : style.inactive} href='/' locale='es'>
          <Image
            width={25}
            height={25}
            alt="argentina flag"
            src="/images/argentina.png"
            className={ style.flag }
          />
          ES
        </Link>
      </div>
    </div>
  )
}

export default IntlSwitcher