import React, {useState} from 'react'
import AuthHeader from '@/components/preauth/AuthHeader'
import SignInForm from '@/components/preauth/SignInForm'


export default function signInPage() {
  return (
    <main>
        <AuthHeader />
        <SignInForm />
    </main>
  )
}
