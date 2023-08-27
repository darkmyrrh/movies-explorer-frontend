export const nameValidation = (name) => {
  const minLength = (length, min) => length < min ? false : true;
  const maxLength = (length, max) => length > max ? false : true;
  const min = 2;
  const max = 30;
  if (!name) {
    return "Необходимо указать имя";
  } else if (!minLength(name.length)) {
    return `Имя должно содержать не менее ${min} символов`;
  }
  else if (!maxLength(name.length)) {
    return `Имя должно содержать не более ${max} символов`;;
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