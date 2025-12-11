import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generatePPM, type PPMData } from "@/lib/documents/ppm-template"
import { generateSubscriptionAgreement, type SubscriptionData } from "@/lib/documents/subscription-agreement-template"
import { generateLoanAgreement, type LoanAgreementData } from "@/lib/documents/loan-agreement-template"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { document_type, data } = body

    let documentContent: string

    switch (document_type) {
      case "ppm":
        documentContent = generatePPM(data as PPMData)
        break
      case "subscription_agreement":
        documentContent = generateSubscriptionAgreement(data as SubscriptionData)
        break
      case "loan_agreement":
        documentContent = generateLoanAgreement(data as LoanAgreementData)
        break
      default:
        return NextResponse.json({ error: "Invalid document type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      content: documentContent,
      filename: `${document_type}_${Date.now()}.txt`,
    })
  } catch (error: any) {
    console.error("[v0] Document generation error:", error)
    return NextResponse.json({ error: error.message || "Failed to generate document" }, { status: 500 })
  }
}
