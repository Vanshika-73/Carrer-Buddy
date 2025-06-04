import { getIndustryInsights } from '@/actions/dashboard';
import { userOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const dashboardPage = async () => {
  const { isOnboarded } = await userOnboardingStatus();
  if (!isOnboarded) {
    redirect('/onboarding');
  }
  const insights = await getIndustryInsights();

  return (
    <div>dashboardPage</div>
  )
}

export default dashboardPage;