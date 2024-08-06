import React from 'react'
import AuthHeader from '@/components/preauth/AuthHeader';
import SignUpForm from '@/components/preauth/SignUpForm';


export default function page() {
  return (
    <main>
        <AuthHeader/>
        <SignUpForm />
    </main>
  )
}
