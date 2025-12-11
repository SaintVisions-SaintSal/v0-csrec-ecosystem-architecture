"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, DollarSign, FileCheck, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

interface ProviderDashboardProps {
  profile: any
  providerProfile: any
  properties: any[]
}

export function ProviderDashboard({ profile, providerProfile, properties }: ProviderDashboardProps) {
  const totalProperties = properties.length
  const approvedProperties = properties.filter((p) => p.status === "approved").length
  const pendingProperties = properties.filter((p) => p.status === "pending_review").length
  const totalCommission = properties.reduce((sum, p) => sum + (p.commission_amount || 0), 0)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Property Provider Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{profile.full_name || profile.email}</span>
            <Link href="/auth/logout">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Welcome back{providerProfile?.company_name ? `, ${providerProfile.company_name}` : ""}!
            </h2>
            <p className="text-muted-foreground mt-2">Manage your property listings and track your deals</p>
          </div>

          {/* Profile Completion Alert */}
          {!providerProfile && (
            <Card className="border-primary bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Complete Your Provider Profile</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your company details to start submitting properties
                    </p>
                  </div>
                  <Link href="/provider/profile/setup">
                    <Button className="bg-primary text-primary-foreground">Complete Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
                <Building2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalProperties}</div>
                <p className="text-xs text-muted-foreground mt-1">Properties submitted</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
                <FileCheck className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{approvedProperties}</div>
                <p className="text-xs text-muted-foreground mt-1">Ready for funding</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{pendingProperties}</div>
                <p className="text-xs text-muted-foreground mt-1">Under evaluation</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Commission</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${totalCommission.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Expected earnings</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="bg-muted">
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-foreground">Property Listings</CardTitle>
                  <Link href="/provider/properties/submit">
                    <Button className="bg-primary text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Property
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {properties.length === 0 ? (
                    <div className="text-center py-12">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No properties submitted yet</p>
                      <Link href="/provider/properties/submit">
                        <Button className="mt-4 bg-primary text-primary-foreground">Submit Your First Property</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{property.property_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {property.city}, {property.state}
                            </p>
                            <p className="text-sm text-foreground mt-1">${property.property_value?.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            {property.commission_amount && (
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Commission</p>
                                <p className="font-semibold text-foreground">
                                  ${property.commission_amount.toLocaleString()}
                                </p>
                              </div>
                            )}
                            <Badge
                              variant={
                                property.status === "approved"
                                  ? "default"
                                  : property.status === "pending_review"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {property.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketplace" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Property Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Browse available deals and opportunities</p>
                  {/* Add marketplace content here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Provider Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  {providerProfile ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Company Name</p>
                        <p className="text-foreground font-semibold">{providerProfile.company_name || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provider Type</p>
                        <p className="text-foreground font-semibold">{providerProfile.provider_type || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Verification Status</p>
                        <Badge>{providerProfile.verification_status}</Badge>
                      </div>
                      <Link href="/provider/profile/edit">
                        <Button className="mt-4">Edit Profile</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Complete your profile to get started</p>
                      <Link href="/provider/profile/setup">
                        <Button className="bg-primary text-primary-foreground">Setup Profile</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
