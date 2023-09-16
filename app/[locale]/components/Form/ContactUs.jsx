'use client'
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import style from './ContactUs.module.css'
import validations from '../../Functions/validations'

export const ContactUs = ({ contactIntl }) => {
  const form = useRef();
  const { nameError, nameErrorFormat, emailError, emailErrorFormat, messageError, messageErrorFormat } = contactIntl
  const errorMsjs = { nameError, nameErrorFormat, emailError, emailErrorFormat, messageError, messageErrorFormat }

  const [formValues, setFormValues] = useState({
    user_name: '',
    user_email: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [touchedFields, setTouchedFields] = useState({
    user_name: false,
    user_email: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };

    if (name === 'message' && value.length > maxCaracteres) {
      updatedValues.message = value.slice(0, maxCaracteres);
    }

    setFormValues(updatedValues);

    setTouchedFields({ ...touchedFields, [name]: true });
    // Realiza la validación en tiempo real después de que el usuario haya hecho un cambio
    const requiredErrors = validations(
      updatedValues.user_name,
      updatedValues.user_email,
      updatedValues.message,
      errorMsjs
    );

    setErrors({ ...requiredErrors });
  };


  const varCharacters = formValues.message.length
  const maxCaracteres = 300;


  const sendEmail = (e) => {
    e.preventDefault();

    // Valida los campos del formulario y actualiza los errores
    const requiredErrors = validations(
      formValues.user_name,
      formValues.user_email,
      formValues.message,
      errorMsjs
    );
    setErrors({ ...requiredErrors });

    if (!Object.values(requiredErrors).some((error) => !!error)) {
      emailjs.sendForm('service_34xhari', 'template_fw3yrml', form.current, 'PJzBzd6GFpccaZ3k3')
        .then((result) => {
          window.alert("Mensaje enviado" + result.text)
          setFormValues({
            user_name: '',
            user_email: '',
            message: '',
          })
          setErrors({
            user_name: '',
            user_email: '',
            message: '',
          })
        }, (error) => {
          console.log(error.text)
        });
    } else window.alert(contactIntl.alert)
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
          <label>{contactIntl.name}<span className={style.required}>*</span></label>
          <input onChange={handleChange} value={formValues.user_name} type="text" name="user_name" placeholder={contactIntl.namePlaceholder} />
          {touchedFields.user_name && errors.user_name
            ? (
              <div className={style.errorMessage}>
                <div className={style.arrowUp}></div>
                <p className={style.warning}>{errors.user_name}</p>
              </div>
            )
            : null
          }
        </li>
        <li>
          <label>{contactIntl.email}<span className={style.required}>*</span></label>
          <input onChange={handleChange} value={formValues.user_email} type="email" name="user_email" placeholder={contactIntl.emailPlaceHolder} />
          {
            touchedFields.user_email && errors.user_email
              ?
              (
                <div className={style.errorMessage}>
                  <div className={style.arrowUp}></div>
                  <p className={style.warning}>{errors.user_email}</p>
                </div>
              )
              : null
          }
        </li>
        <li>
          <label>{contactIntl.message}<span className={style.required}>*</span></label>
          <textarea
            onChange={handleChange}
            value={formValues.user_message}
            name="message"
            placeholder={contactIntl.messagePlaceHolder}
            maxLength={300} />
          <span className={style.docCharacters}>{`${varCharacters}/${maxCaracteres}`}</span>
          {
            touchedFields.message && errors.message
              ? (
                <div className={style.errorMessage}>
                  <div className={style.arrowUp}></div>
                  <p className={style.warning}>{errors.message}</p>
                </div>
              )
              : null
          }
        </li>
      </ul>
      <input type="submit" value={contactIntl.buttonText} className={style.buttonSubmit} />
    </form>
  );
};