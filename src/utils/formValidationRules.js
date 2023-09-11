export const nameValidation = (name) => {
  const minLength = (length) => length < 2 ? false : true;
  const maxLength = (length) => length > 30 ? false : true;
  if (!name) {
    return "Необходимо указать имя";
  } else if (!minLength(name.length)) {
    return "Имя должно содержать не менее 2 символов";
  }
  else if (!maxLength(name.length)) {
    return "Имя должно содержать не более 30 символов";
  }
  return "";
}

export const emailValidation = (email) => {
  const emailRegEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (!email) {
    return "Необходимо указать Email";
  } else if (! new RegExp(emailRegEx).test(email)) {
    return "Email введен некорректно";
  }
  return "";
}

export const passwordValidation = (password) => {
  if (!password) {
    return "Необходимо ввести пароль";
  } 
  return "";
}