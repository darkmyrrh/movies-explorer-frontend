import { useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "../utils/formValidationRules";

const inputFocused = (errors) => {
  const errorsToArray = Object.entries(errors);
  const reducedFieldProps = errorsToArray.reduce(
    (accumulate, [field, fieldProps]) => {
      accumulate[field] = {
        ...fieldProps,
        focused: true,
      };
      return accumulate;
    },
    {}
  );
  return reducedFieldProps;
};

export function useFormValidation(formData) {
  const [errors, setErrors] = useState({
    name: {
      focused: false,
      error: false,
      message: "",
    },
    email: {
      focused: false,
      error: false,
      message: "",
    },
    password: {
      focused: false,
      error: false,
      message: "",
    },
  });
  const validateFormData = ({
    formData,
    field,
    errors,
    applyInputFocused = false,
  }) => {
    let isValid = true;
    const { name, email, password } = formData;
    let updatedErrors = JSON.parse(JSON.stringify(errors));

    if (applyInputFocused) {
      updatedErrors = inputFocused(errors);
    }

    if (updatedErrors.name.focused && (field ? field === "name" : true)) {
      const nameErrorMessage = nameValidation(name);
      updatedErrors.name.error = !!nameErrorMessage;
      updatedErrors.name.message = nameErrorMessage;
      if (!!nameErrorMessage) isValid = false;
    }
    if (updatedErrors.email.focused && (field ? field === "email" : true)) {
      const emailErrorMessage = emailValidation(email);
      updatedErrors.email.error = !!emailErrorMessage;
      updatedErrors.email.message = emailErrorMessage;
      if (!!emailErrorMessage) isValid = false;
    }
    if (
      updatedErrors.password.focused &&
      (field ? field === "password" : true)
    ) {
      const passwordErrorMessage = passwordValidation(password);
      updatedErrors.password.error = !!passwordErrorMessage;
      updatedErrors.password.message = passwordErrorMessage;
      if (!!passwordErrorMessage) isValid = false;
    }
    setErrors(updatedErrors);

    return { isValid, errors };
  };
  const onBlurInput = (e) => {
    const field = e.target.name;
    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        focused: true,
      },
    };
    validateFormData({ formData, field, errors: updatedErrors });
  };
  return { validateFormData, onBlurInput, errors };
}
