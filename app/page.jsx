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

export default function Home() {
  console.log("Rendering Home page");
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
    </div>
  )
}

