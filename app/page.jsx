import HeroSection from "@/components/Hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  FileText,
  PenBox,
  GraduationCap,
  Target,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  Zap,
  Brain,
  Shield,
} from "lucide-react"
import { features } from "@/data/features"
import { howItWorks } from "@/data/howItWorks"
import { faqs } from "@/data/faqs"


export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />

      {/* Features Section - Enhanced Grid Layout */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Powerful Features for Your Career Growth
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to accelerate your professional journey with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                className="border-2 hover:border-primary transition-colors duration-300 group relative overflow-hidden"
                key={index}
              >
                <div className="absolute top-4 right-4 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {feature.highlight}
                </div>
                <CardHeader className="">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl mb-1">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned Layout */}
      {/* <section className="w-full py-20 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-lg text-muted-foreground">Join thousands who have accelerated their careers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-background rounded-3xl flex items-center justify-center shadow-sm mx-auto">
                <Users className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-1">10K+</h3>
                <p className="text-muted-foreground font-medium">Active Users</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-background rounded-3xl flex items-center justify-center shadow-sm mx-auto">
                <TrendingUp className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-1">95%</h3>
                <p className="text-muted-foreground font-medium">Success Rate</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-background rounded-3xl flex items-center justify-center shadow-sm mx-auto">
                <Clock className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-1">24/7</h3>
                <p className="text-muted-foreground font-medium">AI Support</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-background rounded-3xl flex items-center justify-center shadow-sm mx-auto">
                <Award className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-1">1000+</h3>
                <p className="text-muted-foreground font-medium">Interview Questions</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* How it works section - Enhanced Timeline Layout */}
      <section className="w-full  bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Four simple steps to transform your career journey with AI-powered guidance
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="relative">
                  {/* Connection Line for Desktop */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-border transform translate-x-4 z-0" />
                  )}

                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative mx-auto w-fit">
                      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                        {item.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold border-2 border-background">
                        {item.step}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-xl">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced Accordion Layout */}
      <section className="w-full py-20 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find answers to common questions about our AI-powered career platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border-2 rounded-xl px-6 bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6 text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA section - Enhanced Layout */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="gradient rounded-3xl p-12 md:p-16 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  <span className="text-lg font-semibold text-primary-foreground">Join 10,000+ Professionals</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary-foreground leading-tight">
                  Ready to accelerate your Career?
                </h2>

                <p className="mx-auto max-w-3xl text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                  Join thousands of professionals who are advancing their careers with AI-powered guidance and
                  personalized coaching.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Link href={"/dashboard"}>
                    <Button
                      size={"lg"}
                      variant={"secondary"}
                      className="px-10 py-6 text-lg font-semibold min-w-[220px]"
                    >
                      Start Your Journey Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
