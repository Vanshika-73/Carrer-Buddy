import HeroSection from "@/components/Hero";
import { features } from "@/data/features";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />
      {/* features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracting-tighter text-center mb-12">Powerful Features for Your Career Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">{features.map((feature, index) => {
            return (
              <Card className=' border-2 hover:border-primary transition-colors duration-300 ' key={index}>
                <CardContent className='pt-6 text-center flex flex-col items-center'>
                  <div className="flex flex-col items-center justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>

            )
          })}</div>
        </div>
      </section>

      {/*  */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-muted-foreground">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-muted-foreground">Success rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* steps how it works */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works?</h2>
            <p className=" text-center mt-4 text-muted-foreground">Four Simple Steps to Accelerate your Career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">{howItWorks.map((item, index) => {
            return (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16  rounded-full  bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-center">{item.description}</p>
              </div>
            )
          })}</div>
        </div>
      </section>
      {/*testimonials  */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracting-tighter text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">{testimonial.map((item, index) => {
            return (
              <Card className='bg-background' key={index}>
                <CardContent className=''>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-left space-x-3">
                      <div className="relative flex-shrink-0">
                        <Image className="rounded-full object-cover border-2 border-primary/20" src={item.image} height={50} width={50} alt={item.author} />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="text-bold text-l font-semibold">{item.author}</h3>
                        <p className=" text-sm text-muted-foreground">{item.role}</p>
                        <h6 className="text-sm text-primary">{item.company}</h6>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative">
                        <span className="text-3xl text-primary absolute -top-4 -left-4">
                          &quot;
                        </span>
                        {item.quote}
                        <span className="text-3xl text-primary absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>

            )
          })}</div>
        </div>
      </section>
      {/* Faq */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className=" text-center mt-4 text-muted-foreground">Find answers to common questions about our Platform</p>
          </div>
            <div className=" max-w-2xl mx-auto mt-16 p-3">
          <Accordion type="single" collapsible>
              {faqs.map((faq, index) => {
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>

              )
            })}
          </Accordion>
            </div>
        </div>
      </section>
      {/* last section before footer */}
      <section className="w-full ">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">Readt to accelerate your Career?</h2>
            <p className="mx-auto max-w-[600px] text-center mt-4 md:text-xl text-primary-foreground/80">Join thousands of professionals who are advancing their careers with AI-powered guidance.</p>
            <Link href={'/dashboard'} passHref>
            <Button size={'lg'} variant={'secondary'} className='h-11 mt-5 animate-bounce duration-100'>
              Start Your Journey today <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
            </Link>
          </div>
            
        </div>
      </section>
    </div>
  )
}

