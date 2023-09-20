'use client'
import React, { useEffect } from 'react'
import style from './ContactModal.module.css'
import { ContactUs } from '../Form/ContactUs'
const ContactModal = ( { contactIntl, contactClick } ) => {
    document.body.classList.add(style.modalOpen);

    useEffect(() => {
        return () => {
          document.body.classList.remove(style.modalOpen);
        };
      }, []);
  return (
    <div className={style.modalContainer}>
        <div className={style.modal}>
            <span onClick={contactClick}>X</span>
        <ContactUs contactIntl={contactIntl} />
        </div>
    </div>
  )
}

export default ContactModal