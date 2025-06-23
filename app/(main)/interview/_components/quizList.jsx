"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import QuizResult from './quiz-result';

const QuizList = async ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="gradient-title text-3xl md:text-4xl">Recent Quizes</CardTitle>
            <CardDescription>Review your Past quiz Performance</CardDescription>
          </div>
          <Button onClick={() => router.push('/interview/mock')}>
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {assessments.map((asses, i) => {
              return <Card
                key={asses.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedQuiz(asses)}
              >
                <CardHeader>
                  <CardTitle>Quiz {i + 1}</CardTitle>
                  <CardDescription className="flex justify-between w-full">
                    <div>
                      Score: {asses.quizScore.toFixed(1)}%
                    </div>
                    <div>
                      {format(
                        new Date(asses.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}

                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-forground">{asses.improvementTip}</p>
                </CardContent>

              </Card>
            })}
          </div>
        </CardContent>
      </Card>
      {/* dialog */}
      <Dialog open={!!selectedQuiz} onOpenChange={()=>setSelectedQuiz(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult result={selectedQuiz} onStartNew={()=>router.push("/interview/mock")} hideStartNew/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QuizList