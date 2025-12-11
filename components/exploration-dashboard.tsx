"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Church,
  Building2,
  FileText,
  Smartphone,
  Sparkles,
  DollarSign,
  Home,
  Users,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { User } from "@supabase/supabase-js"

interface ExplorationDashboardProps {
  user: User
}

export default function ExplorationDashboard({ user }: ExplorationDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Image src="/saintsal-logo.png" alt="CookinSaints" width={40} height={40} className="object-contain" />
            <div>
              <h1 className="text-lg font-bold text-primary">CookinSaints</h1>
              <p className="text-xs text-muted-foreground">Faith-Based Real Estate Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {user.email}
            </Badge>
            <Link href="/auth/logout">
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to CookinSaints</h2>
          <p className="text-lg text-muted-foreground">
            Explore our faith-based real estate ecosystem. Choose your path when you're ready.
          </p>
        </div>

        {/* Main Role Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary text-primary-foreground">Investor Path</Badge>
              </div>
              <CardTitle className="text-xl">Capital Investor</CardTitle>
              <CardDescription>Invest in faith-based real estate with spiritual alignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access vetted church property investments</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>AI-powered risk assessment with HACP technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Transparent returns and faith-aligned opportunities</span>
                </li>
              </ul>
              <Link href="/apply/investment" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Investment
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Church className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary text-primary-foreground">Borrower Path</Badge>
              </div>
              <CardTitle className="text-xl">Faith-Based Borrower</CardTitle>
              <CardDescription>Get financing for your ministry or church property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Fast loan approvals with SaintSal AI underwriting</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Competitive rates for ministry properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Faith-aligned financing solutions</span>
                </li>
              </ul>
              <Link href="/apply/credit" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Apply for Financing
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary text-primary-foreground">Provider Path</Badge>
              </div>
              <CardTitle className="text-xl">Property Provider</CardTitle>
              <CardDescription>Source and provide properties to our marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>List properties for qualified investors</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Earn commissions on successful deals</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access to capital network and buyers</span>
                </li>
              </ul>
              <Link href="/auth/onboarding?role=property_provider" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Become a Provider
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Platform Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Platform Features</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Investment Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete dashboard for tracking investments, returns, and opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">SaintSal AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automated loan analysis with HACP faith-guided technology
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Legal Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">PPM, subscription agreements, and loan documents ready</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Property Marketplace</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Browse and list faith-based real estate opportunities</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Community Network</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Connect with investors, borrowers, and providers</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Mobile App</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage everything on the go with our mobile app</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Application Forms */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Other Services</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle>Merchant & Payroll Services</CardTitle>
                <CardDescription>Payment processing and payroll solutions for ministries</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/apply/merchant-services">
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle>Tech Development</CardTitle>
                <CardDescription>Custom software and app development for your ministry</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/apply/development">
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
