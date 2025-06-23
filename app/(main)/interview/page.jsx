import { getAssesments } from '@/actions/interview'
import React from 'react'
import StatsCard from './_components/StatsCard'
import QuizList from './_components/quizList'

const  interviewPage = async() => {
  const assessments = await getAssesments();
  return (
    <div >
      <h1 className='text-5xl font-bold gradient-title mb-5'>Interview Preparations</h1>
      
      <div className='space-y-4'>
        <StatsCard assessments={assessments}/>
        <QuizList assessments={assessments}/>
      </div>
    </div>
  )
}

export default interviewPage