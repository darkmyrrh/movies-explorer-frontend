export const validateForm = (name, value) => {
  if (name === "name") {
    const minLength = (length) => (length < 2 ? false : true);
    const maxLength = (length) => (length > 30 ? false : true);
    const nameRegEx = /^([A-Za-z\-\s]{1,30})|([А-ЯЁа-яё\-\s]{1,30})$/;
    if (!value) {
      return "Необходимо указать имя";
    } else if (!minLength(value.length)) {
      return "Имя должно содержать не менее 2 символов";
    } else if (!maxLength(value.length)) {
      return "Имя должно содержать не более 30 символов";
    } else if (!new RegExp(nameRegEx).test(value)) {
      return "Имя может содержать только буквы, пробелы и дефис";
    }
    return "";
  }

  if (name === "email") {
    let errorMessage = "";
    const emailRegEx =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!value) {
      return (errorMessage = "Необходимо указать Email");
    } else if (!new RegExp(emailRegEx).test(value)) {
      return (errorMessage = "Email введен некорректно");
    }
    return errorMessage;
  }

  if (name === "password") {
    if (!value) {
      return "Необходимо ввести пароль";
    }
    return "";
  }
};
