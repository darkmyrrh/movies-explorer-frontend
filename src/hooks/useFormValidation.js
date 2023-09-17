import { useCallback, useState } from "react";
import { validateForm } from "../utils/formValidationRules";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const validationMessage = validateForm(name, value);

    setErrors({...errors, [name]: validationMessage });
    setValues({...values, [name]: value});

    setIsValid(target.closest("form").checkValidity());
     
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors };
}