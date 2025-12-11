"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function InvestmentIntakePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",

    // Investment Details
    investorType: "",
    investmentAmount: "",
    investmentGoals: "",
    riskTolerance: "",

    // Financial Info
    netWorth: "",
    liquidAssets: "",
    annualIncome: "",
    accreditedInvestor: "",

    // Account Setup
    accountType: "",
    beneficiaryName: "",
    taxId: "",

    // Additional
    hearAboutUs: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error: insertError } = await supabase.from("investment_applications").insert({
        user_id: user?.id,
        application_data: formData,
        status: "submitted",
      })

      if (insertError) throw insertError

      router.push("/investor/dashboard?success=investment-application")
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
            <CardTitle className="text-3xl text-primary">Investment Account Setup</CardTitle>
            <CardDescription>Join CookinSaints as a Capital Investor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Legal Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
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
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Investment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investorType">Investor Type *</Label>
                    <Select onValueChange={(value) => handleChange("investorType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="joint">Joint Account</SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="entity">Entity/Corporation</SelectItem>
                        <SelectItem value="ira">IRA/Retirement Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="investmentAmount">Initial Investment Amount *</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      required
                      placeholder="$"
                      value={formData.investmentAmount}
                      onChange={(e) => handleChange("investmentAmount", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="riskTolerance">Risk Tolerance *</Label>
                    <Select onValueChange={(value) => handleChange("riskTolerance", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accreditedInvestor">Are you an Accredited Investor? *</Label>
                    <Select onValueChange={(value) => handleChange("accreditedInvestor", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="unsure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="investmentGoals">Investment Goals *</Label>
                    <Textarea
                      id="investmentGoals"
                      required
                      placeholder="What are your investment objectives?"
                      value={formData.investmentGoals}
                      onChange={(e) => handleChange("investmentGoals", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="netWorth">Net Worth *</Label>
                    <Input
                      id="netWorth"
                      type="number"
                      required
                      placeholder="$"
                      value={formData.netWorth}
                      onChange={(e) => handleChange("netWorth", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="liquidAssets">Liquid Assets *</Label>
                    <Input
                      id="liquidAssets"
                      type="number"
                      required
                      placeholder="$"
                      value={formData.liquidAssets}
                      onChange={(e) => handleChange("liquidAssets", e.target.value)}
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
                </div>
              </div>

              {/* Account Setup */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Account Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountType">Account Type *</Label>
                    <Select onValueChange={(value) => handleChange("accountType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="joint">Joint</SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="ira">Traditional IRA</SelectItem>
                        <SelectItem value="roth">Roth IRA</SelectItem>
                        <SelectItem value="entity">Business Entity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taxId">SSN or Tax ID *</Label>
                    <Input
                      id="taxId"
                      required
                      placeholder="XXX-XX-XXXX"
                      value={formData.taxId}
                      onChange={(e) => handleChange("taxId", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="beneficiaryName">Beneficiary Name (Optional)</Label>
                    <Input
                      id="beneficiaryName"
                      value={formData.beneficiaryName}
                      onChange={(e) => handleChange("beneficiaryName", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                    <Input
                      id="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={(e) => handleChange("hearAboutUs", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Any questions or additional information..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleChange("additionalInfo", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I acknowledge that I have read and agree to the terms and conditions, privacy policy, and investment
                  disclosures. I understand that investments involve risk and past performance does not guarantee future
                  results.
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? "Submitting..." : "Complete Investment Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
