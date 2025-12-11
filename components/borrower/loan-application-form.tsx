"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface LoanApplicationFormProps {
  borrowerProfile: any
  properties: any[]
}

export function LoanApplicationForm({ borrowerProfile, properties }: LoanApplicationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    property_id: "",
    loan_amount: "",
    loan_term_months: "",
    loan_purpose: "",
    loan_type: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Create loan application
      const { data, error: insertError } = await supabase
        .from("loan_applications")
        .insert({
          property_id: formData.property_id,
          borrower_id: borrowerProfile.id,
          loan_amount: Number.parseFloat(formData.loan_amount),
          loan_term_months: Number.parseInt(formData.loan_term_months),
          loan_purpose: formData.loan_purpose,
          loan_type: formData.loan_type,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (insertError) throw insertError

      const analysisResponse = await fetch("/api/underwriting/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loan_application_id: data.id }),
      })

      if (!analysisResponse.ok) {
        console.error("[v0] Failed to trigger analysis:", await analysisResponse.text())
        // Don't fail the whole submission if analysis fails
      }

      // Redirect to dashboard
      router.push("/borrower/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to submit application")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Image src="/saintsal-logo.png" alt="SaintSal™" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary">SaintSal™</h1>
              <p className="text-sm text-muted-foreground">Loan Application</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 text-foreground hover:text-primary"
          onClick={() => router.push("/borrower/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Apply for Faith-Based Loan</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete this application to request financing for your faith-based real estate project
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  1
                </div>
                <span className="text-sm text-foreground">Property</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4" />
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  2
                </div>
                <span className="text-sm text-foreground">Loan Details</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4" />
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  3
                </div>
                <span className="text-sm text-foreground">Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Property Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="property_id" className="text-foreground">
                      Select Property
                    </Label>
                    <Select
                      value={formData.property_id}
                      onValueChange={(value) => setFormData({ ...formData, property_id: value })}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input">
                        <SelectValue placeholder="Choose a property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.property_name} - {property.city}, {property.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {properties.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        You need to add a property first.{" "}
                        <Link href="/borrower/properties/new" className="text-primary underline">
                          Add property
                        </Link>
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.property_id}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan_type" className="text-foreground">
                      Loan Type
                    </Label>
                    <Select
                      value={formData.loan_type}
                      onValueChange={(value) => setFormData({ ...formData, loan_type: value })}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acquisition">Acquisition</SelectItem>
                        <SelectItem value="refinance">Refinance</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="bridge">Bridge</SelectItem>
                        <SelectItem value="term">Term Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan_amount" className="text-foreground">
                      Loan Amount ($)
                    </Label>
                    <Input
                      id="loan_amount"
                      type="number"
                      placeholder="500000"
                      value={formData.loan_amount}
                      onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
                      className="bg-background text-foreground border-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan_term_months" className="text-foreground">
                      Loan Term (months)
                    </Label>
                    <Input
                      id="loan_term_months"
                      type="number"
                      placeholder="60"
                      value={formData.loan_term_months}
                      onChange={(e) => setFormData({ ...formData, loan_term_months: e.target.value })}
                      className="bg-background text-foreground border-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan_purpose" className="text-foreground">
                      Loan Purpose
                    </Label>
                    <Textarea
                      id="loan_purpose"
                      placeholder="Describe how the loan will be used for your faith-based mission..."
                      value={formData.loan_purpose}
                      onChange={(e) => setFormData({ ...formData, loan_purpose: e.target.value })}
                      className="bg-background text-foreground border-input min-h-32"
                      required
                    />
                  </div>

                  <div className="flex gap-2 justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-border text-foreground bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-foreground">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property:</span>
                        <span className="text-foreground font-medium">
                          {properties.find((p) => p.id === formData.property_id)?.property_name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Type:</span>
                        <span className="text-foreground font-medium">{formData.loan_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount:</span>
                        <span className="text-primary font-semibold">
                          ${Number(formData.loan_amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Term:</span>
                        <span className="text-foreground font-medium">{formData.loan_term_months} months</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong className="text-primary">SaintSal™ AI Review:</strong> Once submitted, your application
                      will be analyzed by our patented HACP™ underwriting engine for spiritual alignment, financial
                      viability, and risk assessment.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-2 justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      disabled={isLoading}
                      className="border-border text-foreground bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
