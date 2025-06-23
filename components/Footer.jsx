import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 mx-10">
          {/* Company Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="AI Career Coach" className="w-10 h-10" />
              <h3 className="text-lg font-semibold text-foreground">AI Career Coach</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed w-50 md:w-100">
              Empowering professionals with AI-driven career guidance and personalized coaching to achieve their career
              goals.
            </p>
            {/* <div className="flex space-x-4 justify-center items-center md:justify-start ">
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link> */}
            {/* </div> */}
          </div>


          {/* Legal */}
          <div className="space-y-4 md:mt-0 mt-10 text-center md:text-left">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Disclaimer
              </Link>
            </nav>
          </div>

          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border mx-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Career Coach. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Developed with</span>
              <span className="text-red-500">♥</span>
              <span>by</span>
              <Link href="https://github.com/vanshika" className="text-primary hover:underline font-medium">
                Vanshika
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
