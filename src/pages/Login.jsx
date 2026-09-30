import React, { useEffect } from 'react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { FormLogin } from '../components/forms/FormLogin';

const Login = () => {
  // Al entrar al login se invalida cualquier sesión previa
  useEffect(() => {
    sessionStorage.removeItem('t');
  }, []);

  return (
    <AuthLayout>
      <FormLogin />
    </AuthLayout>
  );
};

export default Login;
