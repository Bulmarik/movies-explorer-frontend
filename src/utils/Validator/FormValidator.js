import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
          break;
        default:
          break;
      }
    }
  }, [value, validations])

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || isEmailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, isEmailError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmailError,
    inputValid
  }
}

export default useValidation;