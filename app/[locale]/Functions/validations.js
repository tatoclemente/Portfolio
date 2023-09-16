const validations = (name, email, message, errorMsjs) => {
    const errors = {}

    if (!name) errors.user_name = errorMsjs.nameError;
  
    if (!email) errors.user_email = errorMsjs.emailError;
  
    if (!message) errors.message = errorMsjs.messageError;
  
    return errors
  }

  export default validations