'use client'
import style from './About.module.css'
import { useLocale } from 'next-intl'
import ArrowScroll from '../ArrowScroll/ArrowScroll'
import LeftSection from './LeftSection/LeftSection'
import RightSection from './RightSection/RightSection'
import ContactModal from '../ContactModal/ContactModal'
import { useState } from 'react'


const About = ({ leftText, contactIntl }) => {
  const locale = useLocale()
  const [showModal, setShowModal] = useState(false)
  const modalContact = {
    p1: leftText.modalContact1,
    p2: leftText.modalContact2,
    p3: leftText.modalContact3
  }

  const contactClick = () => {
    setShowModal(!showModal)
  }
  return (
    <div className={style.AboutContainer}>
      <section className={style.sectionLeft}>
        <LeftSection contactClick={contactClick} leftText={leftText} locale={locale} contactIntl={contactIntl} />
      </section>
      <section className={style.sectionRight}>
        <RightSection />
      </section>
      <ArrowScroll />
      {showModal && <ContactModal modalContact={modalContact} contactClick={contactClick} contactIntl={contactIntl} />}
      
    </div> 
  )
}

export default About