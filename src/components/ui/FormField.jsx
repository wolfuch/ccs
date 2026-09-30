import React from 'react';
import PropTypes from 'prop-types';

// Label + control + mensajes de error. Cada error se muestra solo si su condición es verdadera.
export function FormField({ label, htmlFor, errors = [], testId = 'form-field', children }) {
  return (
    <div className="form__element" data-testid={testId}>
      <label className="form__title" htmlFor={htmlFor} data-testid={`${testId}-label`}>{label}</label>
      {children}
      {errors.filter(error => error.show).map(error => (
        <div key={error.message} className={error.className || 'form__field-error'} data-testid={`${testId}-error${error.id ? `-${error.id}` : ''}`}>
          <span className="pi pi-times"></span>
          {error.message}
        </div>
      ))}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    show: PropTypes.bool,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
  })),
  testId: PropTypes.string,
  children: PropTypes.node.isRequired,
};
