/**
 * Private Placement Memorandum (PPM) Template Generator
 * For SaintSal™ CSREC Investment Offerings
 */

export interface PPMData {
  offering_name: string
  offering_date: string
  total_offering_amount: number
  minimum_investment: number
  maximum_investment: number
  property_name: string
  property_address: string
  property_value: number
  loan_amount: number
  interest_rate: number
  loan_term_months: number
  borrower_name: string
  borrower_ein: string
  borrower_mission: string
  risk_factors: string[]
  expected_returns: string
  use_of_proceeds: string
}

export function generatePPM(data: PPMData): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
PRIVATE PLACEMENT MEMORANDUM

${data.offering_name}

CHURCH AND SPIRITUALLY-BASED REAL ESTATE CREDIT (CSREC)
INVESTMENT OPPORTUNITY

Offering Date: ${data.offering_date}
Prepared by: Saint Vision Group LLC dba SaintSal™


CONFIDENTIAL - FOR ACCREDITED INVESTORS ONLY

═══════════════════════════════════════════════════════════════════════

IMPORTANT NOTICE

THIS PRIVATE PLACEMENT MEMORANDUM (THIS "MEMORANDUM") HAS BEEN PREPARED BY SAINT VISION GROUP LLC ("SaintSal™" OR THE "COMPANY") SOLELY FOR USE BY PROSPECTIVE INVESTORS IN CONNECTION WITH THE PRIVATE PLACEMENT OF SECURITIES DESCRIBED HEREIN.

THIS OFFERING IS AVAILABLE ONLY TO "ACCREDITED INVESTORS" AS DEFINED IN RULE 501(a) OF REGULATION D UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"). 

═══════════════════════════════════════════════════════════════════════


TABLE OF CONTENTS

I. EXECUTIVE SUMMARY
II. THE OFFERING
III. PROPERTY DESCRIPTION
IV. BORROWER INFORMATION
V. USE OF PROCEEDS
VI. RISK FACTORS
VII. TERMS AND CONDITIONS
VIII. SUBSCRIPTION PROCEDURES
IX. LEGAL AND TAX CONSIDERATIONS


═══════════════════════════════════════════════════════════════════════

I. EXECUTIVE SUMMARY

SaintSal™, through its CSREC platform, is offering accredited investors the opportunity to participate in a faith-based real estate credit investment secured by ${data.property_name}.

Key Investment Highlights:

• Total Offering Amount: $${data.total_offering_amount.toLocaleString()}
• Minimum Investment: $${data.minimum_investment.toLocaleString()}
• Maximum Investment: $${data.maximum_investment.toLocaleString()}
• Expected Return: ${data.expected_returns}
• Investment Term: ${data.loan_term_months} months
• Property Value: $${data.property_value.toLocaleString()}
• Loan Amount: $${data.loan_amount.toLocaleString()}
• Loan-to-Value Ratio: ${((data.loan_amount / data.property_value) * 100).toFixed(1)}%


═══════════════════════════════════════════════════════════════════════

II. THE OFFERING

A. Securities Offered
   
The Company is offering up to $${data.total_offering_amount.toLocaleString()} in secured promissory notes (the "Notes") to accredited investors. The Notes will be secured by a first-priority deed of trust on the Property described herein.

B. Interest Rate and Term

The Notes will bear interest at a fixed rate of ${(data.interest_rate * 100).toFixed(2)}% per annum, with monthly interest payments. The principal amount will be repaid at maturity (${data.loan_term_months} months from the date of issuance).

C. Security

The Notes will be secured by:
1. First-priority deed of trust on the Property
2. Assignment of rents and leases
3. Personal guarantee from ${data.borrower_name}
4. Title insurance policy
5. Hazard insurance with SaintSal™ named as mortgagee


═══════════════════════════════════════════════════════════════════════

III. PROPERTY DESCRIPTION

Property Name: ${data.property_name}
Address: ${data.property_address}
Property Type: Faith-Based/Religious Facility
Appraised Value: $${data.property_value.toLocaleString()}
Current Use: Worship and community services


═══════════════════════════════════════════════════════════════════════

IV. BORROWER INFORMATION

Organization: ${data.borrower_name}
EIN: ${data.borrower_ein}
Tax Status: 501(c)(3) Tax-Exempt Organization

Mission Statement:
${data.borrower_mission}

The borrower has been vetted through SaintSal™'s proprietary HACP™ (Human-AI Connection Protocol) underwriting system, which evaluates both financial metrics and spiritual alignment.


═══════════════════════════════════════════════════════════════════════

V. USE OF PROCEEDS

${data.use_of_proceeds}


═══════════════════════════════════════════════════════════════════════

VI. RISK FACTORS

PROSPECTIVE INVESTORS SHOULD CAREFULLY CONSIDER THE FOLLOWING RISK FACTORS BEFORE INVESTING:

${data.risk_factors.map((risk, index) => `${index + 1}. ${risk}`).join("\n\n")}


ADDITIONAL GENERAL RISKS:

• Lack of Liquidity: There is no public market for the Notes, and investors should expect to hold their investment until maturity.

• Borrower Default: If the borrower defaults, investors may not receive their principal and interest payments as expected.

• Property Value Decline: A decline in the property's value could affect the security of the investment.

• Regulatory Changes: Changes in laws or regulations affecting religious organizations or real estate lending could impact returns.

• No Guarantee: This investment is not insured or guaranteed by any government agency.


═══════════════════════════════════════════════════════════════════════

VII. TERMS AND CONDITIONS

A. Minimum and Maximum Investment
   Minimum: $${data.minimum_investment.toLocaleString()}
   Maximum: $${data.maximum_investment.toLocaleString()}

B. Payment Terms
   Interest payments will be made monthly via ACH transfer to the investor's designated bank account.

C. Prepayment
   The borrower may prepay the loan in whole or in part without penalty after 6 months.

D. Default Provisions
   In the event of default, SaintSal™ will initiate foreclosure proceedings and distribute proceeds to investors pro rata.

E. Investor Suitability
   Only accredited investors may participate in this offering.


═══════════════════════════════════════════════════════════════════════

VIII. SUBSCRIPTION PROCEDURES

To invest in this offering, complete the following steps:

1. Review this entire Memorandum and all attachments
2. Complete and sign the Subscription Agreement
3. Complete the Accredited Investor Questionnaire
4. Wire funds to the escrow account provided
5. Submit all documents via the SaintSal™ platform


═══════════════════════════════════════════════════════════════════════

IX. LEGAL AND TAX CONSIDERATIONS

A. Securities Law Compliance
   This offering is being made in reliance on exemptions from registration under the Securities Act, including Regulation D (Rule 506(c)).

B. Tax Considerations
   Investors should consult their tax advisors regarding the tax consequences of this investment. Interest income will be reported on Form 1099-INT.

C. Governing Law
   This Memorandum and the investment shall be governed by the laws of the State where the Property is located.


═══════════════════════════════════════════════════════════════════════

FOR ADDITIONAL INFORMATION OR TO SCHEDULE A Q&A SESSION, PLEASE CONTACT:

Saint Vision Group LLC dba SaintSal™
Email: invest@saintsal.ai
Website: https://saintsal.ai

═══════════════════════════════════════════════════════════════════════

This Memorandum is dated ${currentDate}.

© ${new Date().getFullYear()} Saint Vision Group LLC. All Rights Reserved.
SaintSal™ is a trademark of Saint Vision Group LLC.
`.trim()
}
