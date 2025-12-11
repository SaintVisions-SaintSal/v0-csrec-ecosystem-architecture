"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, DollarSign, TrendingUp, PieChart, Activity } from "lucide-react"

interface InvestorDashboardProps {
  profile: any
  investments: any[]
  transactions: any[]
}

export function InvestorDashboard({ profile, investments, transactions }: InvestorDashboardProps) {
  // Calculate portfolio metrics
  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.investment_amount || 0), 0)
  const totalReturns = investments.reduce((sum, inv) => sum + Number(inv.total_returns || 0), 0)
  const activeInvestments = investments.filter((inv) => inv.status === "active").length
  const avgReturnRate =
    investments.length > 0
      ? investments.reduce((sum, inv) => sum + Number(inv.expected_return_rate || 0), 0) / investments.length
      : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/saintsal-logo.png" alt="SaintSal™" width={50} height={50} className="object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-primary">SaintSal™</h1>
                <p className="text-sm text-muted-foreground">Investor Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{profile?.full_name}</p>
                <p className="text-xs text-muted-foreground">{profile?.email}</p>
              </div>
              <Button variant="outline" className="border-border text-foreground bg-transparent" asChild>
                <Link href="/auth/logout">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Across {investments.length} investments</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalReturns.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : 0}% return rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Investments</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activeInvestments}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently generating returns</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Avg Return Rate</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{(avgReturnRate * 100).toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Expected annual return</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Investments and Opportunities */}
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              My Investments
            </TabsTrigger>
            <TabsTrigger
              value="opportunities"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              New Opportunities
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* My Investments Tab */}
          <TabsContent value="investments" className="space-y-4">
            {investments.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You haven&apos;t made any investments yet</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore Opportunities
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {investments.map((investment) => (
                  <Card key={investment.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground">
                            {investment.loan_application?.property?.property_name || "Property Investment"}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-1">
                            {investment.loan_application?.property?.city},{" "}
                            {investment.loan_application?.property?.state}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            investment.status === "active"
                              ? "default"
                              : investment.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                          className={investment.status === "active" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {investment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Investment Amount</p>
                          <p className="text-lg font-semibold text-primary">
                            ${Number(investment.investment_amount).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expected Return</p>
                          <p className="text-lg font-semibold text-foreground">
                            {(Number(investment.expected_return_rate) * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Returns</p>
                          <p className="text-lg font-semibold text-primary">
                            ${Number(investment.total_returns).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Term</p>
                          <p className="text-lg font-semibold text-foreground">
                            {investment.investment_term_months} mo
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border text-foreground bg-transparent"
                        >
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                          View Returns <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* New Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Available Investment Opportunities</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Faith-based real estate investments vetted by SaintSal™ AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  New opportunities will appear here once loans are approved
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                <CardDescription className="text-muted-foreground">Your investment activity history</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg bg-background"
                      >
                        <div>
                          <p className="font-medium text-foreground">{transaction.transaction_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.transaction_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${Number(transaction.amount).toLocaleString()}</p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "outline"}
                            className={transaction.status === "completed" ? "bg-primary text-primary-foreground" : ""}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
