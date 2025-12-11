"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { Plus, Building2, FileText, CheckCircle2, Clock } from "lucide-react"

interface BorrowerDashboardProps {
  profile: any
  properties: any[]
  loanApplications: any[]
  borrowerProfile: any
}

export function BorrowerDashboard({ profile, properties, loanApplications, borrowerProfile }: BorrowerDashboardProps) {
  const pendingApplications = loanApplications.filter(
    (app) => app.status === "under_review" || app.status === "submitted",
  )
  const approvedApplications = loanApplications.filter((app) => app.status === "approved")
  const fundedLoans = loanApplications.filter((app) => app.status === "funded")

  // Calculate profile completion
  const profileFields = [
    borrowerProfile?.organization_name,
    borrowerProfile?.organization_type,
    borrowerProfile?.ein,
    borrowerProfile?.tax_exempt_status,
    borrowerProfile?.mission_statement,
  ]
  const completedFields = profileFields.filter(Boolean).length
  const profileCompletion = (completedFields / profileFields.length) * 100

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
                <p className="text-sm text-muted-foreground">Borrower Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {borrowerProfile?.organization_name || profile?.full_name}
                </p>
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
        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <Card className="mb-6 bg-card border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Complete Your Profile</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete your profile to unlock loan application features
                  </CardDescription>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/borrower/profile">Complete Profile</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompletion} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(profileCompletion)}% complete</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Properties</CardTitle>
              <Building2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{properties.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total properties listed</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pending</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Under review</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{approvedApplications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for funding</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Funded</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{fundedLoans.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active loans</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Loan Applications
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Properties
            </TabsTrigger>
          </TabsList>

          {/* Loan Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Your Loan Applications</h3>
                <p className="text-sm text-muted-foreground">Track your application status</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/borrower/apply">
                  <Plus className="mr-2 h-4 w-4" />
                  New Application
                </Link>
              </Button>
            </div>

            {loanApplications.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">You haven&apos;t submitted any loan applications yet</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/borrower/apply">Start Your First Application</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {loanApplications.map((application) => (
                  <Card
                    key={application.id}
                    className="bg-card border-border hover:border-primary/50 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground">
                            {application.property?.property_name || "Loan Application"}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-1">
                            {application.loan_type} • {application.loan_term_months} months
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={application.status === "approved" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {application.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Loan Amount</p>
                          <p className="text-lg font-semibold text-primary">
                            ${Number(application.loan_amount).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                          <p className="text-lg font-semibold text-foreground">
                            {application.interest_rate
                              ? `${(Number(application.interest_rate) * 100).toFixed(2)}%`
                              : "TBD"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">SaintSal™ Score</p>
                          <p className="text-lg font-semibold text-primary">
                            {application.saintsal_score || "Pending"}
                          </p>
                        </div>
                      </div>
                      {application.status === "saintsal_analysis" && (
                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                            <p className="text-sm text-primary font-medium">
                              SaintSal™ AI is analyzing your application...
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border text-foreground bg-transparent"
                        >
                          View Details
                        </Button>
                        {application.status === "draft" && (
                          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            Continue Application
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Your Properties</h3>
                <p className="text-sm text-muted-foreground">Manage your property listings</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/borrower/properties/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Link>
              </Button>
            </div>

            {properties.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">You haven&apos;t added any properties yet</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/borrower/properties/new">Add Your First Property</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {properties.map((property) => (
                  <Card key={property.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground">{property.property_name}</CardTitle>
                          <CardDescription className="text-muted-foreground mt-1">
                            {property.city}, {property.state}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={property.status === "approved" ? "default" : "outline"}
                          className={property.status === "approved" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Property Type:</span>
                          <span className="text-sm text-foreground font-medium">{property.property_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Property Value:</span>
                          <span className="text-sm text-primary font-semibold">
                            ${Number(property.property_value).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Loan Requested:</span>
                          <span className="text-sm text-foreground font-medium">
                            ${Number(property.loan_amount_requested).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-border text-foreground bg-transparent"
                      >
                        View Property
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
