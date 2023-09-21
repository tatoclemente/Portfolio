'use client'
import React, { useEffect, useState } from 'react'
import style from './ContactModal.module.css'
import { ContactUs } from '../Form/ContactUs'
import MsgContact from './MsgContact/MsgContact'
const ContactModal = ( { contactIntl, contactClick } ) => {

  const [showMsg, setShowMsg] = useState(true)
    document.body.classList.add(style.modalOpen);

    useEffect(() => {
      setTimeout(() => {
        setShowMsg(false)
      }, 3000)
    },[])

    useEffect(() => {
        return () => {
          document.body.classList.remove(style.modalOpen);
        };
      }, []);
  return (
    <div className={style.modalContainer}>
      <div className={style.modal}>
        {
          showMsg 
          ? <MsgContact />
          : <div className={style.modalContent}>
              <span className={style.close} onClick={contactClick}>X</span>
              <ContactUs contactIntl={contactIntl} />
            </div>
        }
      </div>
    </div>
  )
}

export default ContactModal