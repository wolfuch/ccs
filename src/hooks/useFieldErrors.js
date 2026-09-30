import { useState } from 'react';

export function useFieldErrors(initialErrors) {
  const [fieldErrors, setFieldErrors] = useState(initialErrors);

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  return { fieldErrors, setFieldErrors, clearFieldError };
}
