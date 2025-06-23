"use client";

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingSchema } from '@/lib/userOnboardingSchema';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
const OnboardingForm = ({ industries }) => {
  const router = useRouter();
   const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updatedResult,
  } = useFetch(updateUser);
  const { register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(OnboardingSchema)
  });
  const onSubmit = async (values) => {
    try {
      console.log(values);
      await updateUserFn({...values})
    } catch (error) {
      console.error("Onboarding Error:",error.message);
    }
  };
  useEffect(()=>{
    console.log("data after result",updatedResult);
    if(updatedResult?.success && !updateLoading){
      toast.success("Onboarded Successfully");
      router.push('/dashboard');
      router.refresh();
    }
  },[updatedResult,updateLoading])
  return (
    <div className='flex items-center justify-center bg-background'>
      <Card className='w-full max-w-lg mt-3 mx-auto text-center'>
        <CardHeader>
          <CardTitle className='gradient-title text-2xl'>Complete your Profile</CardTitle>
          <CardDescription> Tell us more about yourself to get personalized career insights and
            recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="subIndustry">Specialization</Label>
              <Select
                onValueChange={(value) => setValue("subIndustry", value)}
              >
                <SelectTrigger id="subIndustry" className="w-full">
                  <SelectValue placeholder="Select your specialization" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Specializations</SelectLabel>
                    {industries[0]?.subIndustries.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-sm text-red-500">
                  {errors.subIndustry.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground ">
                <i>Separate multiple skills with commas</i>
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <Button type='submit' className='w-full' disabled={updateLoading}>
              {updateLoading? (
                <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'>Saving...</Loader2>
                </>
              ): 
              "Complete Profile"
              }
              </Button>
          </form>
        </CardContent>

      </Card>

    </div>
  )
}

export default OnboardingForm