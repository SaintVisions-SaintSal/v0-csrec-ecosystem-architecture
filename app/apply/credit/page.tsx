"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function CreditApplicationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dateOfBirth: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Employment
    employerName: "",
    jobTitle: "",
    annualIncome: "",
    yearsEmployed: "",

    // Loan Details
    loanAmount: "",
    loanPurpose: "",
    propertyType: "",
    creditScore: "",

    // Additional Info
    additionalNotes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Store in database
      const { error: insertError } = await supabase.from("credit_applications").insert({
        user_id: user?.id,
        application_data: formData,
        status: "submitted",
      })

      if (insertError) throw insertError

      router.push("/dashboard?success=credit-application")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <Image src="/saintsal-logo.png" alt="SaintSal™" width={100} height={100} />
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Credit Application</CardTitle>
            <CardDescription>Complete this form to apply for financing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ssn">SSN (Last 4 digits) *</Label>
                    <Input
                      id="ssn"
                      maxLength={4}
                      required
                      placeholder="1234"
                      value={formData.ssn}
                      onChange={(e) => handleChange("ssn", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employerName">Employer Name *</Label>
                    <Input
                      id="employerName"
                      required
                      value={formData.employerName}
                      onChange={(e) => handleChange("employerName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      required
                      value={formData.jobTitle}
                      onChange={(e) => handleChange("jobTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualIncome">Annual Income *</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      required
                      placeholder="$"
                      value={formData.annualIncome}
                      onChange={(e) => handleChange("annualIncome", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsEmployed">Years Employed *</Label>
                    <Input
                      id="yearsEmployed"
                      type="number"
                      required
                      value={formData.yearsEmployed}
                      onChange={(e) => handleChange("yearsEmployed", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Loan Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount">Requested Loan Amount *</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      required
                      placeholder="$"
                      value={formData.loanAmount}
                      onChange={(e) => handleChange("loanAmount", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select onValueChange={(value) => handleChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="church">Church</SelectItem>
                        <SelectItem value="worship_center">Worship Center</SelectItem>
                        <SelectItem value="community_center">Community Center</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="mixed_use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="creditScore">Estimated Credit Score *</Label>
                    <Select onValueChange={(value) => handleChange("creditScore", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (750+)</SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (below 650)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                    <Textarea
                      id="loanPurpose"
                      required
                      placeholder="Describe the purpose of this loan..."
                      value={formData.loanPurpose}
                      onChange={(e) => handleChange("loanPurpose", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Additional Information</h3>
                <div>
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional information you'd like to share..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange("additionalNotes", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
