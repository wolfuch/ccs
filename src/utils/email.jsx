  const validateEmail = (email, setEmailFormatError) => {
    console.log('Validating email:', email);
    // Regex: no consecutive dots, valid characters, valid domain
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    setEmailFormatError(!isValid && email.trim() !== '');
    return isValid;
  };

  export { validateEmail };