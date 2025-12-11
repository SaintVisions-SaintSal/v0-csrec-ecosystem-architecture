/**
 * SaintSal™ Underwriting Engine
 * Church and Spiritually-based Real Estate Credit (CSREC) Analysis
 */

export interface UnderwritingInput {
  loan_amount: number
  loan_term_months: number
  loan_type: string
  property_value: number
  property_type: string
  borrower_revenue: number
  borrower_debt: number
  credit_score?: number
  spiritual_alignment_score?: number
  years_in_operation: number
}

export interface UnderwritingResult {
  spiritual_alignment: number
  financial_viability: number
  risk_level: "low" | "medium" | "high" | "very_high"
  saintsal_score: number
  recommended_interest_rate: number
  recommended_ltv: number
  recommendation: "approve" | "conditional" | "decline"
  reasoning: string
  key_strengths: string[]
  key_concerns: string[]
  suggested_conditions: string[]
}

/**
 * Calculate Loan-to-Value Ratio
 */
export function calculateLTV(loanAmount: number, propertyValue: number): number {
  return propertyValue > 0 ? loanAmount / propertyValue : 0
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 */
export function calculateDSCR(annualRevenue: number, annualDebtPayments: number): number {
  return annualDebtPayments > 0 ? annualRevenue / annualDebtPayments : 0
}

/**
 * Calculate Debt-to-Income Ratio
 */
export function calculateDTI(totalDebt: number, annualRevenue: number): number {
  return annualRevenue > 0 ? totalDebt / annualRevenue : 0
}

/**
 * Assess Financial Viability Score (0-100)
 */
export function assessFinancialViability(input: UnderwritingInput): number {
  const ltv = calculateLTV(input.loan_amount, input.property_value)
  const dti = calculateDTI(input.borrower_debt, input.borrower_revenue)

  // Monthly loan payment estimate (assuming 7% interest)
  const monthlyRate = 0.07 / 12
  const numPayments = input.loan_term_months
  const monthlyPayment =
    (input.loan_amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  const annualDebtPayment = monthlyPayment * 12 + input.borrower_debt * 0.1 // Assume 10% of existing debt is annual payment
  const dscr = calculateDSCR(input.borrower_revenue, annualDebtPayment)

  let score = 100

  // LTV scoring (lower is better, max 75% recommended)
  if (ltv > 0.85) score -= 30
  else if (ltv > 0.75) score -= 20
  else if (ltv > 0.65) score -= 10
  else if (ltv <= 0.5) score += 10

  // DTI scoring (lower is better)
  if (dti > 4) score -= 25
  else if (dti > 3) score -= 15
  else if (dti > 2) score -= 5
  else if (dti <= 1) score += 10

  // DSCR scoring (higher is better, min 1.25 recommended)
  if (dscr < 1.0) score -= 30
  else if (dscr < 1.25) score -= 15
  else if (dscr >= 1.5) score += 15
  else if (dscr >= 2.0) score += 25

  // Years in operation bonus
  if (input.years_in_operation >= 10) score += 10
  else if (input.years_in_operation >= 5) score += 5
  else if (input.years_in_operation < 2) score -= 10

  return Math.max(0, Math.min(100, score))
}

/**
 * Assess Risk Level based on multiple factors
 */
export function assessRiskLevel(
  input: UnderwritingInput,
  financialScore: number,
): "low" | "medium" | "high" | "very_high" {
  const ltv = calculateLTV(input.loan_amount, input.property_value)

  if (financialScore >= 80 && ltv <= 0.65 && input.years_in_operation >= 5) {
    return "low"
  } else if (financialScore >= 65 && ltv <= 0.75) {
    return "medium"
  } else if (financialScore >= 50 && ltv <= 0.85) {
    return "high"
  } else {
    return "very_high"
  }
}

/**
 * Calculate recommended interest rate based on risk
 */
export function calculateInterestRate(
  riskLevel: "low" | "medium" | "high" | "very_high",
  saintSalScore: number,
): number {
  const baseRate = 0.055 // 5.5%

  const riskPremiums = {
    low: 0.01,
    medium: 0.02,
    high: 0.035,
    very_high: 0.05,
  }

  const scorePremium = (100 - saintSalScore) / 1000 // Max 0.05%

  return baseRate + riskPremiums[riskLevel] + scorePremium
}
