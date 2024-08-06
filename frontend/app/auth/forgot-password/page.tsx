import React from 'react'; 
import AuthHeader from '@/components/preauth/AuthHeader';
import ForgotPasswordForm from '@/components/preauth/ForgotPasswordForm';

export default function page() {
  return (
    <main>
      <AuthHeader />
      <ForgotPasswordForm />
    </main>
  );
}