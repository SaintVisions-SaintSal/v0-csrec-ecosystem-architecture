import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { loan_application_id } = body

    if (!loan_application_id) {
      return NextResponse.json({ error: "Missing loan_application_id" }, { status: 400 })
    }

    // Fetch loan application with related data
    const { data: application, error: appError } = await supabase
      .from("loan_applications")
      .select(
        `
        *,
        property:properties(*),
        borrower:borrower_profiles(*, user:profiles(*))
      `,
      )
      .eq("id", loan_application_id)
      .single()

    if (appError || !application) {
      return NextResponse.json({ error: "Loan application not found" }, { status: 404 })
    }

    // Update status to analyzing
    await supabase.from("loan_applications").update({ status: "saintsal_analysis" }).eq("id", loan_application_id)

    // Prepare data for AI analysis
    const analysisInput = {
      loan_amount: application.loan_amount,
      loan_term_months: application.loan_term_months,
      loan_type: application.loan_type,
      loan_purpose: application.loan_purpose,
      property_value: application.property?.property_value,
      property_type: application.property?.property_type,
      borrower_organization: application.borrower?.organization_name,
      borrower_type: application.borrower?.organization_type,
      tax_exempt_status: application.borrower?.tax_exempt_status,
      annual_revenue: application.borrower?.annual_revenue,
      current_debt: application.borrower?.current_debt,
      years_in_operation: application.borrower?.years_in_operation,
      mission_statement: application.borrower?.mission_statement,
      spiritual_alignment_score: application.borrower?.spiritual_alignment_score,
    }

    const startTime = Date.now()

    // SaintSal™ AI Underwriting Analysis
    const { text: analysis } = await generateText({
      model: "openai/gpt-4o",
      prompt: `You are SaintSal™, an AI underwriting agent specializing in Church and Spiritually-based Real Estate Credit (CSREC). 

Analyze this loan application using the HACP™ (Human-AI Connection Protocol) framework with faith-guided principles:

Loan Application Data:
${JSON.stringify(analysisInput, null, 2)}

Provide a comprehensive analysis covering:

1. SPIRITUAL ALIGNMENT ASSESSMENT (0-100):
   - Faith-based mission alignment
   - Community impact potential
   - Spiritual stewardship indicators

2. FINANCIAL VIABILITY SCORE (0-100):
   - Debt-to-income ratio
   - Loan-to-value ratio
   - Revenue adequacy
   - Debt service coverage

3. RISK ASSESSMENT (Low/Medium/High/Very High):
   - Property risk factors
   - Borrower capacity
   - Market conditions
   - Operational sustainability

4. RECOMMENDED TERMS:
   - Suggested interest rate
   - Recommended loan-to-value cap
   - Suggested covenants

5. OVERALL SAINTSAL SCORE (0-100):
   A holistic score combining spiritual, financial, and risk factors.

6. RECOMMENDATION:
   APPROVE, CONDITIONAL APPROVAL, or DECLINE with detailed reasoning.

Format response as JSON with these exact keys:
{
  "spiritual_alignment": number (0-100),
  "financial_viability": number (0-100),
  "risk_level": "low" | "medium" | "high" | "very_high",
  "saintsal_score": number (0-100),
  "recommended_interest_rate": number (decimal, e.g., 0.065 for 6.5%),
  "recommended_ltv": number (decimal, e.g., 0.75 for 75%),
  "recommendation": "approve" | "conditional" | "decline",
  "reasoning": "detailed explanation",
  "key_strengths": ["strength1", "strength2"],
  "key_concerns": ["concern1", "concern2"],
  "suggested_conditions": ["condition1", "condition2"]
}`,
    })

    const processingTime = Date.now() - startTime

    // Parse AI response
    let analysisData: any
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = analysis.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      return NextResponse.json({ error: "Failed to parse AI analysis" }, { status: 500 })
    }

    // Calculate interest rate based on risk and score
    const baseRate = 0.055 // 5.5% base
    const riskPremium =
      analysisData.risk_level === "low"
        ? 0.01
        : analysisData.risk_level === "medium"
          ? 0.02
          : analysisData.risk_level === "high"
            ? 0.035
            : 0.05

    const scorePremium = (100 - analysisData.saintsal_score) / 1000 // Max 0.05% for score
    const finalInterestRate = baseRate + riskPremium + scorePremium

    // Update loan application with analysis
    const { error: updateError } = await supabase
      .from("loan_applications")
      .update({
        status: analysisData.recommendation === "approve" ? "approved" : "under_review",
        saintsal_score: analysisData.saintsal_score,
        saintsal_analysis: analysisData,
        risk_assessment: analysisData.risk_level,
        interest_rate: finalInterestRate,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", loan_application_id)

    if (updateError) {
      console.error("[v0] Failed to update application:", updateError)
      return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
    }

    // Log the analysis
    await supabase.from("saintsal_analysis_logs").insert({
      loan_application_id,
      analysis_type: "underwriting",
      input_data: analysisInput,
      output_data: analysisData,
      confidence_score: analysisData.saintsal_score / 100,
      processing_time_ms: processingTime,
      model_version: "gpt-4o",
    })

    return NextResponse.json({
      success: true,
      analysis: analysisData,
      interest_rate: finalInterestRate,
      processing_time_ms: processingTime,
    })
  } catch (error: any) {
    console.error("[v0] SaintSal underwriting error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
