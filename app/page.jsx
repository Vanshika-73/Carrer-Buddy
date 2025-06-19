import HeroSection from "@/components/Hero"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Target, Zap, CheckCircle, Star, Quote, Sparkles, Crown, Rocket } from "lucide-react"

const coreFeatures = [
  {
    icon: <Brain className="h-16 w-16 text-white" />,
    title: "AI Brain",
    description:
      "Advanced algorithms that understand your unique career DNA and create personalized growth strategies.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    shape: "rounded-[2rem] rotate-3",
    delay: "0ms",
  },
  {
    icon: <Target className="h-16 w-16 text-white" />,
    title: "Precision Targeting",
    description: "Laser-focused interview prep with AI-generated scenarios tailored to your dream companies.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    shape: "rounded-[2rem] -rotate-2",
    delay: "200ms",
  },
  {
    icon: <Zap className="h-16 w-16 text-white" />,
    title: "Lightning Growth",
    description: "Accelerate your career trajectory with data-driven insights and real-time market intelligence.",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    shape: "rounded-[2rem] rotate-1",
    delay: "400ms",
  },
]

const processSteps = [
  {
    number: "01",
    title: "Dream Big",
    description: "Share your wildest career aspirations with our AI",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "02",
    title: "AI Magic",
    description: "Watch as AI crafts your personalized success blueprint",
    icon: <Crown className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Launch Forward",
    description: "Execute your plan and soar to new career heights",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-pink-500 to-orange-500",
  },
]



export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />

      {/* Features Section - Artistic Cards */}
      {/* <section className="py-32 bg-gradient-to-br bg-muted/30  relative">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r  border border-purple-200 rounded-full px-6 py-3 text-sm font-bold ">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </div>
            <h2 className="text-5xl md:text-6xl gradient-title mb-8 leading-tight">
              Three Pillars of
              <br />
              <span className="bg-gradient-to-r  gradient-title ">
                Career Mastery
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of career development with our revolutionary AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="group relative" style={{ animationDelay: feature.delay }}>
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-[3rem] blur-2xl scale-110 from-purple-400 to-pink-400"></div>

                <div
                  className={`relative bg-white ${feature.shape} p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-100 group-hover:border-gray-200 group-hover:-translate-y-4 group-hover:scale-105`}
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-t-[2rem]"></div>

                  <div
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-3xl font-black text-gray-900 mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>

                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process Section - Creative Flow */}
      <section className="py-20 md:py-32 bg-gradient-to-br bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-sm font-bold text-white mb-12 shadow-2xl">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Join 50,000+ Career Champions</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black  gradient-title mb-8 leading-tight">
              Your Journey to
              <br />
              <span className=" gradient-title">
                Greatness
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Three transformative steps that will redefine your professional destiny
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {coreFeatures.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Connecting line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent transform -translate-y-1/2 z-10"></div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-[3rem] blur-2xl scale-110 from-purple-400 to-pink-400"></div>

                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-10 group-hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2">
                     <div
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${step.gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    {step.icon}
                  </div>

                      <div className="text-6xl font-black text-white/10 mb-4">{step.number}</div>
                      <h3 className="text-3xl font-black text-white mb-6">{step.title}</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  

      {/* CTA Section - Cosmic Design */}
      {/* <section className="py-32 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Floating elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rotate-45 animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rotate-12 animate-bounce delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-sm font-bold text-white mb-12 shadow-2xl">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Join 50,000+ Career Champions</span>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-7 leading-[0.9] tracking-tight">
              Ready to
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Rewrite
              </span>
              <br />
              Your Story?
            </h2>

            <p className="text-2xl text-muted-foreground mb-7 max-w-4xl mx-auto leading-relaxed font-light">
              Your extraordinary career transformation begins with a single click.
              <br />
              <span className="text-muted-foreground font-medium">Are you ready to become legendary?</span>
            </p> */}

            {/* <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-black rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-0 hover:scale-105"
                >
                  Begin Your Legend
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div> */}

            {/* <div className="mt-16 text-muted-foreground text-sm">
              ✨ No credit card required • 7-day free trial • Cancel anytime
            </div>
          </div>
        </div>
      </section> */} 
    </div>
  )
}
