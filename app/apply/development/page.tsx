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

export default function DevelopmentIntakePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    // Contact Info
    fullName: "",
    email: "",
    phone: "",
    company: "",

    // Project Info
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectGoals: "",

    // Technical Details
    platformNeeded: "",
    features: "",
    designPreference: "",
    hasExistingDesign: "",

    // Timeline & Budget
    timeline: "",
    budget: "",
    startDate: "",

    // Additional
    technicalRequirements: "",
    integrations: "",
    hostingPreference: "",
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

      const { error: insertError } = await supabase.from("development_projects").insert({
        user_id: user?.id,
        project_data: formData,
        status: "inquiry",
      })

      if (insertError) throw insertError

      router.push("/dashboard?success=development-inquiry")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit inquiry")
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
            <CardTitle className="text-3xl text-primary">Development Project Intake</CardTitle>
            <CardDescription>Tell us about your development needs and we'll create a custom solution</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company/Organization *</Label>
                      <Input
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                      />
                    </div>
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

              {/* Project Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Project Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        required
                        value={formData.projectName}
                        onChange={(e) => handleChange("projectName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select onValueChange={(value) => handleChange("projectType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="web_app">Web Application</SelectItem>
                          <SelectItem value="mobile_app">Mobile App</SelectItem>
                          <SelectItem value="saas">SaaS Platform</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="api">API Development</SelectItem>
                          <SelectItem value="ai_integration">AI Integration</SelectItem>
                          <SelectItem value="custom">Custom Solution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      required
                      placeholder="Describe your project in detail..."
                      value={formData.projectDescription}
                      onChange={(e) => handleChange("projectDescription", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectGoals">Project Goals & Objectives *</Label>
                    <Textarea
                      id="projectGoals"
                      required
                      placeholder="What do you want to achieve?"
                      value={formData.projectGoals}
                      onChange={(e) => handleChange("projectGoals", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Technical Requirements</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="platformNeeded">Platform/Technology *</Label>
                      <Select onValueChange={(value) => handleChange("platformNeeded", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web (Next.js/React)</SelectItem>
                          <SelectItem value="ios">iOS</SelectItem>
                          <SelectItem value="android">Android</SelectItem>
                          <SelectItem value="cross_platform">Cross-Platform (React Native)</SelectItem>
                          <SelectItem value="wordpress">WordPress</SelectItem>
                          <SelectItem value="shopify">Shopify</SelectItem>
                          <SelectItem value="custom">Custom Stack</SelectItem>
                          <SelectItem value="unsure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hasExistingDesign">Do you have existing designs? *</Label>
                      <Select onValueChange={(value) => handleChange("hasExistingDesign", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, complete designs</SelectItem>
                          <SelectItem value="partial">Partial designs</SelectItem>
                          <SelectItem value="no">No, need design services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="features">Key Features Needed *</Label>
                    <Textarea
                      id="features"
                      required
                      placeholder="List the main features (e.g., user auth, payment processing, AI chatbot, etc.)"
                      value={formData.features}
                      onChange={(e) => handleChange("features", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="integrations">Required Integrations</Label>
                    <Textarea
                      id="integrations"
                      placeholder="Third-party services (Stripe, Supabase, AI APIs, etc.)"
                      value={formData.integrations}
                      onChange={(e) => handleChange("integrations", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hostingPreference">Hosting Preference</Label>
                    <Select onValueChange={(value) => handleChange("hostingPreference", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hosting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vercel">Vercel (recommended)</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="azure">Azure</SelectItem>
                        <SelectItem value="gcp">Google Cloud</SelectItem>
                        <SelectItem value="existing">Use existing hosting</SelectItem>
                        <SelectItem value="unsure">Need recommendation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Timeline & Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="timeline">Desired Timeline *</Label>
                    <Select onValueChange={(value) => handleChange("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">ASAP (1-2 weeks)</SelectItem>
                        <SelectItem value="fast">Fast (2-4 weeks)</SelectItem>
                        <SelectItem value="standard">Standard (1-2 months)</SelectItem>
                        <SelectItem value="flexible">Flexible (2-3 months)</SelectItem>
                        <SelectItem value="long_term">Long-term (3+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Select onValueChange={(value) => handleChange("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k">$100,000+</SelectItem>
                        <SelectItem value="flexible">Flexible/TBD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Preferred Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Additional Information</h3>
                <div>
                  <Label htmlFor="technicalRequirements">Technical Constraints or Requirements</Label>
                  <Textarea
                    id="technicalRequirements"
                    placeholder="Any specific technical requirements, compliance needs, etc."
                    value={formData.technicalRequirements}
                    onChange={(e) => handleChange("technicalRequirements", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Anything Else We Should Know?</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Additional context, questions, or concerns..."
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Project Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
