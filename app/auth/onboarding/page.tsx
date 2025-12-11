"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function OnboardingPage() {
  const [accountType, setAccountType] = useState<"investor" | "borrower" | "property_provider">("investor")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      }
    }
    checkUser()
  }, [router, supabase])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        profile_type: accountType,
        full_name: fullName,
        email: user.email,
        phone: phone || null,
      })

      if (profileError) throw profileError

      // Redirect to appropriate dashboard
      if (accountType === "investor") {
        router.push("/investor/dashboard")
      } else if (accountType === "borrower") {
        router.push("/borrower/dashboard")
      } else if (accountType === "property_provider") {
        router.push("/provider/dashboard")
      }
    } catch (error: unknown) {
      console.error("[v0] Onboarding error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image src="/saintsal-logo.png" alt="SaintSal™" width={120} height={120} className="object-contain" />
          </div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Complete Your Profile</CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about yourself to get started with CookinSaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleComplete}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label className="text-foreground">I am a...</Label>
                    <RadioGroup
                      value={accountType}
                      onValueChange={(value) => setAccountType(value as "investor" | "borrower" | "property_provider")}
                    >
                      <div className="flex items-center space-x-3 space-y-0 rounded-md border border-input p-4 hover:bg-accent/50 cursor-pointer">
                        <RadioGroupItem value="investor" id="investor" />
                        <Label htmlFor="investor" className="flex-1 cursor-pointer text-foreground">
                          <div className="font-semibold">Capital Investor</div>
                          <div className="text-sm text-muted-foreground">I want to invest in church real estate</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0 rounded-md border border-input p-4 hover:bg-accent/50 cursor-pointer">
                        <RadioGroupItem value="borrower" id="borrower" />
                        <Label htmlFor="borrower" className="flex-1 cursor-pointer text-foreground">
                          <div className="font-semibold">Borrower</div>
                          <div className="text-sm text-muted-foreground">I need financing for church property</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0 rounded-md border border-input p-4 hover:bg-accent/50 cursor-pointer">
                        <RadioGroupItem value="property_provider" id="property_provider" />
                        <Label htmlFor="property_provider" className="flex-1 cursor-pointer text-foreground">
                          <div className="font-semibold">Property Provider</div>
                          <div className="text-sm text-muted-foreground">
                            I source and provide properties (wholesaler, fund, company)
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName" className="text-foreground">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-background text-foreground border-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName" className="text-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-background text-foreground border-input"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number (optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-background text-foreground border-input"
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Setting up..." : "Complete Setup"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
