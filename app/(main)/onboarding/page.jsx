import { userOnboardingStatus } from '@/actions/user'
import { industries } from '@/data/industries'
import { redirect } from 'next/navigation';
import React from 'react'
import OnboardingForm from './_components/OnboardingForm';

const onboarding = async() => {
    // check if user is onboarded
    const {isOnboarded} = await userOnboardingStatus();
    console.log("page.jsx",isOnboarded);
    if(isOnboarded){
      redirect('/dashboard');
    }
  return (
    <main><OnboardingForm industries={industries}/></main>
  )
}

export default onboarding