const validations = (name, email, message, errorMsjs) => {
    const errors = {}

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const patron = /^.*?(\S)\1{2,}.*?$/

    if (!name) errors.user_name = errorMsjs.nameError
    else if (patron.test(name)) errors.user_name = errorMsjs.nameErrorFormat


    if (!email) errors.user_email = errorMsjs.emailError;
    else if (!emailRegex.test(email)) errors.user_email = errorMsjs.emailErrorFormat
  
    if (!message) errors.message = errorMsjs.messageError
    else if (patron.test(message)) errors.message = errorMsjs.messageErrorFormat

    return errors
  }

  export default validations