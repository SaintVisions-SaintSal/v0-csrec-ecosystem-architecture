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

export default function MerchantServicesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    // Business Info
    businessName: "",
    legalBusinessName: "",
    dba: "",
    ein: "",
    businessType: "",
    yearsInBusiness: "",

    // Contact Info
    contactName: "",
    email: "",
    phone: "",

    // Business Address
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Services Requested
    merchantServices: false,
    payrollServices: false,
    monthlyVolume: "",
    averageTransactionSize: "",
    numberOfEmployees: "",
    payrollFrequency: "",

    // Additional
    currentProcessor: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error: insertError } = await supabase.from("merchant_applications").insert({
        user_id: user?.id,
        application_data: formData,
        status: "submitted",
      })

      if (insertError) throw insertError

      router.push("/dashboard?success=merchant-application")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
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
            <CardTitle className="text-3xl text-primary">Merchant Services & Payroll Application</CardTitle>
            <CardDescription>Sign up for payment processing and payroll services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Business Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        required
                        value={formData.businessName}
                        onChange={(e) => handleChange("businessName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
                      <Input
                        id="legalBusinessName"
                        required
                        value={formData.legalBusinessName}
                        onChange={(e) => handleChange("legalBusinessName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dba">DBA (if applicable)</Label>
                      <Input id="dba" value={formData.dba} onChange={(e) => handleChange("dba", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="ein">EIN/Tax ID *</Label>
                      <Input
                        id="ein"
                        required
                        placeholder="XX-XXXXXXX"
                        value={formData.ein}
                        onChange={(e) => handleChange("ein", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        required
                        value={formData.yearsInBusiness}
                        onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select onValueChange={(value) => handleChange("businessType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="church">Church</SelectItem>
                        <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                        <SelectItem value="ministry">Ministry</SelectItem>
                        <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleChange("contactName", e.target.value)}
                    />
                  </div>
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

              {/* Business Address */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Business Address</h3>
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

              {/* Services Requested */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Services Requested</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="merchantServices"
                      checked={formData.merchantServices}
                      onChange={(e) => handleChange("merchantServices", e.target.checked)}
                      className="h-4 w-4 rounded border-border"
                    />
                    <Label htmlFor="merchantServices" className="cursor-pointer">
                      Merchant Services (Payment Processing)
                    </Label>
                  </div>
                  {formData.merchantServices && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <Label htmlFor="monthlyVolume">Estimated Monthly Volume</Label>
                        <Input
                          id="monthlyVolume"
                          type="number"
                          placeholder="$"
                          value={formData.monthlyVolume}
                          onChange={(e) => handleChange("monthlyVolume", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="averageTransactionSize">Average Transaction Size</Label>
                        <Input
                          id="averageTransactionSize"
                          type="number"
                          placeholder="$"
                          value={formData.averageTransactionSize}
                          onChange={(e) => handleChange("averageTransactionSize", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="currentProcessor">Current Payment Processor (if any)</Label>
                        <Input
                          id="currentProcessor"
                          value={formData.currentProcessor}
                          onChange={(e) => handleChange("currentProcessor", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payrollServices"
                      checked={formData.payrollServices}
                      onChange={(e) => handleChange("payrollServices", e.target.checked)}
                      className="h-4 w-4 rounded border-border"
                    />
                    <Label htmlFor="payrollServices" className="cursor-pointer">
                      Payroll Services
                    </Label>
                  </div>
                  {formData.payrollServices && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                        <Input
                          id="numberOfEmployees"
                          type="number"
                          value={formData.numberOfEmployees}
                          onChange={(e) => handleChange("numberOfEmployees", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="payrollFrequency">Payroll Frequency</Label>
                        <Select onValueChange={(value) => handleChange("payrollFrequency", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                            <SelectItem value="semimonthly">Semi-Monthly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Additional Information</h3>
                <div>
                  <Label htmlFor="additionalInfo">Additional Notes or Questions</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional information..."
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
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
