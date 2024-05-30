'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import style from './IntlSwitcher.module.css'
import { AiOutlineGlobal } from 'react-icons/ai'
import { useClickOutSide } from '@/app/[locale]/hooks/useClickOutSide'
import { Link } from '@/navigation'

const IntlSwitcher = ({ locale }) => {

  const ref = useRef(null)
  const { showModal, setShowModal } = useClickOutSide(ref)
  


  return (
    <div className={style.mainContainer} ref={ref}>
      <AiOutlineGlobal onClick={() => setShowModal(!showModal)} className={style.global} />
      <div style={showModal === false ? { display: 'none' } : {}} className={style.linksContainer}>
        <Link 
          onClick={() => setShowModal(false)}
          className={locale === 'en' ? style.active : style.inactive} href='/' locale='en'
        >

          <Image
            width={25}
            height={25}
            alt="usa flag"
            src="/images/united_states.png"
            className={ style.flag }
            priority={true}
          />
          EN
        </Link>
        <Link 
          onClick={() => setShowModal(false)}
          className={locale === 'es' ? style.active : style.inactive} href='/' locale='es'
        >
          <Image
            width={25}
            height={25}
            alt="argentina flag"
            src="/images/argentina.png"
            className={ style.flag }
            priority={true}
          />
          ES
        </Link>
      </div>
    </div>
  )
}

export default IntlSwitcher