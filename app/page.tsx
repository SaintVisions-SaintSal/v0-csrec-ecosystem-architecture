import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, TrendingUp, FileText, Shield, Smartphone } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/transparentdrip-20full-20saintsal-e2-84-a2.png"
                alt="CookinSaints"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#d4af37]">CookinSaints</h1>
                <p className="text-xs text-[#d4af37]/70">Powered by SaintSal™ AI</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/auth/login" className="text-gray-400 hover:text-[#d4af37] transition">
                Sign In
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-[#d4af37] hover:bg-[#c9a432] text-[#0f0f0f] font-semibold">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
            <span className="text-[#d4af37] text-sm font-semibold">Responsible Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            CookinSaints Platform
          </h2>
          <p className="text-xl text-gray-400 mb-8 text-pretty leading-relaxed">
            Church Real Estate Credit Ecosystem powered by SaintSal™ AI and patented HACP™ technology. Connect
            faith-based borrowers with capital investors through intelligent underwriting and tokenized real estate
            investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-[#d4af37] hover:bg-[#c9a432] text-[#0f0f0f] font-semibold text-lg px-8">
                Start Investing
              </Button>
            </Link>
            <Link href="/apply/credit">
              <Button
                size="lg"
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 text-lg px-8 bg-transparent"
              >
                Apply for Financing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-[#1a1a1a]/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-[#d4af37] mb-12">Platform Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Investor Portal</h4>
                <p className="text-gray-400 text-pretty">
                  Complete dashboard for capital investors to browse opportunities, track investments, and manage
                  portfolio.
                </p>
                <Link href="/investor/dashboard" className="text-[#d4af37] text-sm mt-4 inline-block hover:underline">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <Building2 className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Borrower Application</h4>
                <p className="text-gray-400 text-pretty">
                  Streamlined loan application flow with SaintSal AI integration for fast, faith-guided underwriting
                  decisions.
                </p>
                <Link href="/borrower/apply" className="text-[#d4af37] text-sm mt-4 inline-block hover:underline">
                  Apply now →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">AI Underwriting</h4>
                <p className="text-gray-400 text-pretty">
                  Automated loan analysis powered by SaintSal AI with spiritual alignment scoring and risk assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Legal Documents</h4>
                <p className="text-gray-400 text-pretty">
                  Comprehensive legal templates including PPM, subscription agreements, and loan documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Property Providers</h4>
                <p className="text-gray-400 text-pretty">
                  Platform for wholesalers and property companies to submit deals and earn commissions on funded
                  properties.
                </p>
                <Link href="/provider/dashboard" className="text-[#d4af37] text-sm mt-4 inline-block hover:underline">
                  Join as provider →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition">
              <CardContent className="p-6">
                <Smartphone className="w-12 h-12 text-[#d4af37] mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Mobile App</h4>
                <p className="text-gray-400 text-pretty">
                  Full CookinSaints mobile experience for investors, borrowers, and providers on the go.
                </p>
                <Link href="/mobile" className="text-[#d4af37] text-sm mt-4 inline-block hover:underline">
                  View wireframes →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Forms Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center text-[#d4af37] mb-4">Get Started Today</h3>
          <p className="text-center text-gray-400 mb-12 text-pretty">Choose the application that fits your needs</p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/apply/credit">
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition cursor-pointer h-full">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Credit Application</h4>
                  <p className="text-gray-400 text-sm">Apply for church property financing</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/apply/investment">
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition cursor-pointer h-full">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Investment Intake</h4>
                  <p className="text-gray-400 text-sm">Start investing in faith-based real estate</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/apply/merchant-services">
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition cursor-pointer h-full">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Merchant Services</h4>
                  <p className="text-gray-400 text-sm">Apply for payment processing solutions</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/apply/development">
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition cursor-pointer h-full">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Tech Development</h4>
                  <p className="text-gray-400 text-sm">Request custom development projects</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/20 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CookinSaints Platform. Powered by SaintSal™ AI & HACP™ Technology.
          </p>
          <p className="text-gray-500 text-xs mt-2">Responsible Intelligence for Faith-Based Real Estate</p>
        </div>
      </footer>
    </div>
  )
}
