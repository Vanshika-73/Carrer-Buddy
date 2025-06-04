'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { industries } from '@/data/industries';
import OnboardingForm from './_components/OnboardingForm';
import { userOnboardingStatus } from '@/actions/user';
import { BarLoader } from 'react-spinners';

const OnboardingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { isOnboarded } = await userOnboardingStatus();

        if (isOnboarded) {
          router.push('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
        // Retry logic (optional enhancement: add retry limit)
        setTimeout(() => {
          checkOnboardingStatus();
        }, 1000);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  if (isLoading) {
    return <BarLoader className="flex justify-center items-center text-2xl" />;
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
