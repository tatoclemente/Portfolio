'use client'
import React, { useEffect, useState } from 'react'
import style from './ContactModal.module.css'
import { ContactUs } from '../Form/ContactUs'
import MsgContact from './MsgContact/MsgContact'
import { AiFillCloseCircle } from 'react-icons/ai'
const ContactModal = ( { contactIntl, contactClick, modalContact } ) => {

  const [showMsg, setShowMsg] = useState(true)
    document.body.classList.add(style.modalOpen);

    useEffect(() => {
      setTimeout(() => {
        setShowMsg(false)
      }, 2700)
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
          ? <MsgContact modalContact={modalContact} />
          : <div className={style.modalContent}>
              <AiFillCloseCircle className={style.close} onClick={contactClick} />
              <ContactUs contactIntl={contactIntl} />
            </div>
        }
      </div>
    </div>
  )
}

export default ContactModal