"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Home, TrendingUp, FileText, User, Bell, Plus, Search, Settings } from "lucide-react"

export function MobileWireframes() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/saintsal-logo.png" alt="SaintSal™" width={80} height={80} className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">CookinSaints™ Mobile App</h1>
          <p className="text-xl text-muted-foreground">SaintSal™ CSREC Platform - Faith-Driven Investment on the Go</p>
        </div>

        {/* Wireframes Grid */}
        <Tabs defaultValue="investor" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="investor"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Investor Views
              </TabsTrigger>
              <TabsTrigger
                value="borrower"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Borrower Views
              </TabsTrigger>
              <TabsTrigger
                value="common"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Common Views
              </TabsTrigger>
            </TabsList>
          </div>

          {/* INVESTOR VIEWS */}
          <TabsContent value="investor" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Investor Home Screen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Investor Home</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-6">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 bg-foreground/20 rounded-sm" />
                      <div className="w-4 h-3 bg-foreground/20 rounded-sm" />
                      <div className="w-4 h-3 bg-foreground/60 rounded-sm" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Welcome back</p>
                      <h2 className="text-lg font-bold text-foreground">John Smith</h2>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Portfolio Card */}
                  <div className="bg-primary rounded-2xl p-4 mb-6">
                    <p className="text-xs text-primary-foreground/80 mb-1">Total Portfolio Value</p>
                    <h1 className="text-3xl font-bold text-primary-foreground mb-4">$250,000</h1>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-primary-foreground/80">Returns</p>
                        <p className="font-semibold text-primary-foreground">$15,250</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-foreground/80">ROI</p>
                        <p className="font-semibold text-primary-foreground">+6.1%</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-muted rounded-xl p-3">
                      <p className="text-xs text-muted-foreground">Active</p>
                      <p className="text-xl font-bold text-primary">8</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3">
                      <p className="text-xs text-muted-foreground">Avg Return</p>
                      <p className="text-xl font-bold text-primary">6.5%</p>
                    </div>
                  </div>

                  {/* Recent Investment */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Recent Investments</h3>
                    <div className="bg-muted rounded-xl p-3">
                      <p className="text-xs font-semibold text-foreground">Grace Community Church</p>
                      <p className="text-xs text-muted-foreground mb-2">Austin, TX</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">$25,000</span>
                        <span className="text-primary font-semibold">6.8%</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-auto pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-primary" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <Search className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Investment Opportunities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Investment Opportunities</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Opportunities</h2>
                    <Button size="sm" className="bg-primary text-primary-foreground h-8">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <Badge className="bg-primary text-primary-foreground whitespace-nowrap">All</Badge>
                    <Badge variant="outline" className="whitespace-nowrap">
                      Churches
                    </Badge>
                    <Badge variant="outline" className="whitespace-nowrap">
                      Ministries
                    </Badge>
                  </div>

                  {/* Opportunity Cards */}
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Opportunity 1 */}
                    <div className="bg-muted rounded-2xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">Faith Baptist Church</h3>
                          <p className="text-xs text-muted-foreground">Dallas, TX</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold text-foreground">$500,000</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-semibold text-primary">7.2%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SaintSal Score</span>
                          <span className="font-semibold text-primary">92/100</span>
                        </div>
                      </div>
                      <Progress value={65} className="h-1.5 mb-2" />
                      <p className="text-xs text-muted-foreground mb-3">65% funded</p>
                      <Button size="sm" className="w-full bg-primary text-primary-foreground h-8">
                        Invest Now
                      </Button>
                    </div>

                    {/* Opportunity 2 */}
                    <div className="bg-muted rounded-2xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">Hope Community Center</h3>
                          <p className="text-xs text-muted-foreground">Houston, TX</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Featured
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold text-foreground">$750,000</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-semibold text-primary">6.9%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SaintSal Score</span>
                          <span className="font-semibold text-primary">88/100</span>
                        </div>
                      </div>
                      <Progress value={40} className="h-1.5 mb-2" />
                      <p className="text-xs text-muted-foreground mb-3">40% funded</p>
                      <Button size="sm" className="w-full bg-primary text-primary-foreground h-8">
                        Invest Now
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-muted-foreground" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <Search className="w-6 h-6 text-primary" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Portfolio Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Portfolio Details</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">My Portfolio</h2>
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Summary Card */}
                  <div className="bg-primary rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-primary-foreground/80">Total Value</p>
                        <h2 className="text-2xl font-bold text-primary-foreground">$250,000</h2>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-primary-foreground/80">Monthly Return</p>
                        <h3 className="text-lg font-bold text-primary-foreground">$1,354</h3>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-primary-foreground/90">
                      <div>
                        <p>8 Active</p>
                      </div>
                      <div>
                        <p>2 Completed</p>
                      </div>
                    </div>
                  </div>

                  {/* Investment List */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    <div className="bg-muted rounded-xl p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm">Grace Community</p>
                          <p className="text-xs text-muted-foreground">Austin, TX</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Active</Badge>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Investment</span>
                        <span className="font-semibold text-foreground">$25,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Returns YTD</span>
                        <span className="font-semibold text-primary">$1,700 (6.8%)</span>
                      </div>
                    </div>

                    <div className="bg-muted rounded-xl p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm">New Life Ministry</p>
                          <p className="text-xs text-muted-foreground">San Antonio, TX</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Active</Badge>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Investment</span>
                        <span className="font-semibold text-foreground">$50,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Returns YTD</span>
                        <span className="font-semibold text-primary">$3,250 (6.5%)</span>
                      </div>
                    </div>

                    <div className="bg-muted rounded-xl p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm">Victory Church</p>
                          <p className="text-xs text-muted-foreground">Fort Worth, TX</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Investment</span>
                        <span className="font-semibold text-foreground">$30,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Total Returns</span>
                        <span className="font-semibold text-primary">$2,100 (7.0%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-muted-foreground" />
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <Search className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* BORROWER VIEWS */}
          <TabsContent value="borrower" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Borrower Home Screen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Borrower Home</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Organization</p>
                      <h2 className="text-lg font-bold text-foreground">Faith Baptist</h2>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-muted rounded-2xl p-4 mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Application Status</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-primary">Under SaintSal Review</span>
                    </div>
                    <Progress value={75} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">Expected decision in 2-3 days</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button className="bg-primary text-primary-foreground h-20 flex-col gap-2">
                      <Plus className="w-6 h-6" />
                      <span className="text-xs">New Application</span>
                    </Button>
                    <Button variant="outline" className="border-border h-20 flex-col gap-2 bg-transparent">
                      <FileText className="w-6 h-6" />
                      <span className="text-xs">View Docs</span>
                    </Button>
                  </div>

                  {/* Recent Application */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Recent Application</h3>
                    <div className="bg-muted rounded-xl p-4">
                      <Badge className="bg-primary text-primary-foreground mb-3 text-xs">Pending</Badge>
                      <p className="font-semibold text-foreground mb-1">Church Expansion Loan</p>
                      <p className="text-xs text-muted-foreground mb-3">Submitted Dec 10, 2025</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Requested</span>
                          <span className="font-semibold text-foreground">$500,000</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SaintSal Score</span>
                          <span className="font-semibold text-primary">92/100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-primary" />
                    <FileText className="w-6 h-6 text-muted-foreground" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Application Form</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">New Application</h2>
                    <span className="text-xs text-muted-foreground">Step 1 of 3</span>
                  </div>

                  {/* Progress */}
                  <Progress value={33} className="h-2 mb-6" />

                  {/* Form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Property Name</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-foreground">Faith Baptist Church Building</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Loan Type</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Select loan type...</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Loan Amount</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">$0</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Loan Term (months)</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">0</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Purpose</label>
                      <div className="bg-muted rounded-lg p-3 h-20">
                        <p className="text-sm text-muted-foreground">Describe your mission...</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="bg-primary text-primary-foreground h-12 mt-4">Continue to Step 2</Button>
                </div>
              </div>

              {/* Loan Status Tracking */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Loan Status</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Loan Status</h2>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>

                  {/* Loan Details Card */}
                  <div className="bg-primary rounded-2xl p-4 mb-6">
                    <p className="text-xs text-primary-foreground/80 mb-1">Current Balance</p>
                    <h1 className="text-3xl font-bold text-primary-foreground mb-4">$475,000</h1>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-primary-foreground/80">Original</p>
                        <p className="font-semibold text-primary-foreground">$500,000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-foreground/80">Rate</p>
                        <p className="font-semibold text-primary-foreground">6.5%</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Payment */}
                  <div className="bg-muted rounded-xl p-4 mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Next Payment Due</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">$3,254</p>
                        <p className="text-xs text-muted-foreground">Due Jan 1, 2026</p>
                      </div>
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        Pay Now
                      </Button>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Recent Payments</h3>
                    <div className="space-y-2 overflow-y-auto">
                      <div className="bg-muted rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">$3,254</p>
                          <p className="text-xs text-muted-foreground">Dec 1, 2025</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Paid</Badge>
                      </div>
                      <div className="bg-muted rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">$3,254</p>
                          <p className="text-xs text-muted-foreground">Nov 1, 2025</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Paid</Badge>
                      </div>
                      <div className="bg-muted rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">$3,254</p>
                          <p className="text-xs text-muted-foreground">Oct 1, 2025</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">Paid</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-muted-foreground" />
                    <FileText className="w-6 h-6 text-primary" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* COMMON VIEWS */}
          <TabsContent value="common" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Login Screen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Login</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Logo */}
                  <div className="flex justify-center mb-12 mt-8">
                    <Image
                      src="/saintsal-logo.png"
                      alt="SaintSal™"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-2">Welcome Back</h1>
                    <p className="text-sm text-muted-foreground">Sign in to your SaintSal account</p>
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">your@email.com</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Password</label>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">••••••••</p>
                      </div>
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground h-12">Sign In</Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Don&apos;t have an account? <span className="text-primary font-semibold">Sign Up</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Screen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Profile</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Profile</h2>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Edit
                    </Button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-3">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">John Smith</h3>
                    <p className="text-sm text-muted-foreground">john.smith@email.com</p>
                    <Badge className="bg-primary text-primary-foreground mt-2 text-xs">Accredited Investor</Badge>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Personal Information</span>
                      <span className="text-muted-foreground">›</span>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Payment Methods</span>
                      <span className="text-muted-foreground">›</span>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Notifications</span>
                      <span className="text-muted-foreground">›</span>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Security</span>
                      <span className="text-muted-foreground">›</span>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Help & Support</span>
                      <span className="text-muted-foreground">›</span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive h-12 mt-4 bg-transparent"
                  >
                    Sign Out
                  </Button>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-muted-foreground" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <Search className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Notifications Screen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                <div className="w-full max-w-sm mx-auto aspect-[9/19] bg-card border-4 border-border rounded-3xl shadow-2xl p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Notifications</h2>
                    <span className="text-xs text-primary font-semibold">Mark all read</span>
                  </div>

                  {/* Notifications List */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-foreground text-sm">Investment Approved!</p>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your $25,000 investment in Grace Community Church has been approved.
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-foreground text-sm">Payment Received</p>
                        <span className="text-xs text-muted-foreground">1d ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Monthly return payment of $170 has been deposited.
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-foreground text-sm">New Opportunity</p>
                        <span className="text-xs text-muted-foreground">2d ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Faith Baptist Church - $500K loan opportunity available.
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-foreground text-sm">Document Ready</p>
                        <span className="text-xs text-muted-foreground">3d ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your tax documents for 2025 are ready for download.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-4 pt-4 border-t border-border flex justify-around">
                    <Home className="w-6 h-6 text-muted-foreground" />
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    <Search className="w-6 h-6 text-muted-foreground" />
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
