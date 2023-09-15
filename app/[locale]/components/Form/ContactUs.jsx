'use client'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import style from './ContactUs.module.css'

export const ContactUs = ({contactIntl}) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_34xhari', 'template_fw3yrml', form.current, 'PJzBzd6GFpccaZ3k3')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className={style.formContainer} id='contact'>
      <h1>{contactIntl.contact}</h1>
      <div className={style.subtitles}>
        <p>
        {contactIntl.subtitle}
        </p>
        <p>
        {contactIntl.helpMessage}{' '}😃
        </p>
      </div>

      <ul className={style.formList}>
        <li>
          <label>{contactIntl.name}</label>
          <input type="text" name="user_name" placeholder={contactIntl.namePlaceholder} />
        </li>
        <li>
          <label>{contactIntl.email}</label>
          <input type="email" name="user_email" placeholder={contactIntl.emailPlaceHolder} />
        </li>
        <li>
          <label>{contactIntl.message}</label>
          <textarea name="message" placeholder={contactIntl.messagePlaceHolder} />
        </li>
      </ul>
      <input type="submit" value={contactIntl.buttonText} className={style.buttonSubmit} />
    </form>
  );
};