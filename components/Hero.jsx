"use client"

import { useEffect, useRef } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Star } from "lucide-react"

function HeroSection() {
  const imageRef = useRef(null)

  useEffect(() => {
    const imageElement = imageRef.current

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const scrollThreshold = 100

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled")
      } else {
        imageElement?.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rotate-12 animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-7 mt-24">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-3 px-5">
              <h1 className="text-6xl md:text-5xl lg:text-7xl font-black leading-[0.85] tracking-tight">
                <span className="block gradient-title text-center md:text-left  ">Your</span>
                <span className="block bg-gradient-to-r text-center md:text-left gradient-title  animate-gradient">
                  Dream Career
                </span>
                <span className="block gradient-title text-center md:text-left ">Awaits</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl font-light text-center md:text-left ">
                Unlock your potential with AI-powered career coaching that adapts to your unique journey and accelerates
                your success.
              </p>
            <div className=" text-muted-foreground text-sm text-center md:text-left">
              ✨ No credit card required • 7-day free trial • Cancel anytime
            </div>
            </div>
            <div className="flex  sm:flex-row gap-6 px-5  justify-center md:justify-start items-center  ">

              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-6 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-0"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>


            </div>

            <div className="flex justify-center md:justify-start items-center gap-12 pt-3 px-5">
              {/* <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">50K+</div>
                <div className="text-sm text-gray-400 font-medium">Career Transformations</div>
              </div> */}
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">98%</div>
                <div className="text-sm text-gray-400 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400 font-medium">AI Guidance</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-[3rem] blur-3xl scale-110 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl rotate-12 animate-bounce delay-500"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce delay-1000"></div>

            <div ref={imageRef} className="relative transform hover:scale-105 transition-transform duration-700">
              <Image
                src="/banner.jpeg"
                width={600}
                height={400}
                alt="AI Career Coach Platform"
                className="rounded-[3rem] shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-[3rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
