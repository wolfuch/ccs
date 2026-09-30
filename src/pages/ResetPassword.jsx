import React from 'react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { FormResetPass } from '../components/forms/FormResetPass';

const ResetPassword = () => (
  <AuthLayout>
    <FormResetPass />
  </AuthLayout>
);

export default ResetPassword;
