/**
 * Loan Agreement Template
 * For SaintSal™ CSREC Borrowers
 */

export interface LoanAgreementData {
  borrower_name: string
  borrower_address: string
  borrower_ein: string
  loan_amount: number
  interest_rate: number
  loan_term_months: number
  monthly_payment: number
  property_address: string
  loan_date: string
  maturity_date: string
  loan_purpose: string
}

export function generateLoanAgreement(data: LoanAgreementData): string {
  return `
LOAN AGREEMENT

This LOAN AGREEMENT (this "Agreement") is entered into as of ${data.loan_date}, by and between:

BORROWER:
${data.borrower_name}
${data.borrower_address}
EIN: ${data.borrower_ein}

AND

LENDER:
Saint Vision Group LLC dba SaintSal™
on behalf of participating investors

═══════════════════════════════════════════════════════════════════════

RECITALS

WHEREAS, Borrower has requested a loan from Lender to be used for ${data.loan_purpose};

WHEREAS, the loan will be secured by real property located at ${data.property_address} (the "Property");

WHEREAS, Lender has agreed to provide the loan subject to the terms and conditions set forth in this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

═══════════════════════════════════════════════════════════════════════

ARTICLE 1: LOAN TERMS

1.1 Principal Amount
    Lender agrees to loan to Borrower the principal sum of $${data.loan_amount.toLocaleString()} (the "Loan").

1.2 Interest Rate
    The Loan shall bear interest at a fixed rate of ${(data.interest_rate * 100).toFixed(2)}% per annum.

1.3 Payment Terms
    Borrower shall make monthly payments of $${data.monthly_payment.toLocaleString()} on the first day of each month, beginning [DATE].

1.4 Maturity Date
    The entire unpaid principal balance and all accrued interest shall be due and payable on ${data.maturity_date} (the "Maturity Date").

1.5 Prepayment
    Borrower may prepay the Loan in whole or in part at any time after 6 months from the date hereof without penalty.

═══════════════════════════════════════════════════════════════════════

ARTICLE 2: SECURITY

2.1 Deed of Trust
    This Loan is secured by a first-priority deed of trust, assignment of rents, and security agreement on the Property.

2.2 Additional Security
    The Loan is additionally secured by:
    a) Assignment of all rents and leases from the Property
    b) Personal guarantee of [GUARANTOR NAME]
    c) Title insurance policy naming Lender as insured mortgagee
    d) Hazard insurance policy naming Lender as loss payee

═══════════════════════════════════════════════════════════════════════

ARTICLE 3: USE OF PROCEEDS

3.1 Borrower shall use the Loan proceeds exclusively for: ${data.loan_purpose}

3.2 Borrower shall not use any portion of the Loan proceeds for any purpose other than as described above without Lender's prior written consent.

═══════════════════════════════════════════════════════════════════════

ARTICLE 4: BORROWER REPRESENTATIONS AND WARRANTIES

Borrower represents and warrants to Lender that:

4.1 ORGANIZATION AND GOOD STANDING
    Borrower is a duly organized and validly existing entity in good standing under the laws of its state of organization.

4.2 AUTHORIZATION
    Borrower has full power and authority to enter into this Agreement and perform its obligations hereunder.

4.3 NO CONFLICTS
    The execution and performance of this Agreement does not violate any law or agreement to which Borrower is subject.

4.4 TAX-EXEMPT STATUS
    Borrower is recognized as tax-exempt under Section 501(c)(3) of the Internal Revenue Code.

4.5 TITLE TO PROPERTY
    Borrower has good and marketable title to the Property, free and clear of all liens except as disclosed.

4.6 NO DEFAULT
    Borrower is not in default under any material agreement or obligation.

═══════════════════════════════════════════════════════════════════════

ARTICLE 5: AFFIRMATIVE COVENANTS

Borrower covenants and agrees that, so long as any amount remains outstanding under this Agreement:

5.1 INSURANCE
    Maintain hazard insurance on the Property with Lender named as mortgagee.

5.2 TAXES
    Pay all real property taxes and assessments when due.

5.3 MAINTENANCE
    Maintain the Property in good condition and repair.

5.4 COMPLIANCE
    Comply with all applicable laws and regulations.

5.5 FINANCIAL REPORTING
    Provide Lender with:
    a) Annual audited financial statements within 120 days of fiscal year end
    b) Quarterly unaudited financial statements within 45 days of quarter end
    c) Annual Form 990 within 30 days of filing

5.6 TAX-EXEMPT STATUS
    Maintain Borrower's tax-exempt status under Section 501(c)(3).

5.7 NOTICE OF DEFAULT
    Promptly notify Lender of any default or event that could reasonably be expected to become a default.

═══════════════════════════════════════════════════════════════════════

ARTICLE 6: NEGATIVE COVENANTS

Borrower covenants and agrees that, without Lender's prior written consent:

6.1 NO ADDITIONAL DEBT
    Borrower shall not incur any additional debt secured by the Property.

6.2 NO TRANSFERS
    Borrower shall not sell, transfer, or convey the Property.

6.3 NO CHANGE IN USE
    Borrower shall not materially change the use of the Property.

6.4 NO DISSOLUTION
    Borrower shall not dissolve, merge, or consolidate with any other entity.

═══════════════════════════════════════════════════════════════════════

ARTICLE 7: EVENTS OF DEFAULT

The following shall constitute Events of Default:

7.1 Failure to make any payment when due and such failure continues for 10 days.

7.2 Breach of any covenant or agreement herein and such breach continues for 30 days after notice.

7.3 Any representation or warranty proves to be false or misleading in any material respect.

7.4 Borrower becomes insolvent or files for bankruptcy.

7.5 Loss or revocation of Borrower's tax-exempt status.

7.6 Foreclosure or attachment against the Property.

═══════════════════════════════════════════════════════════════════════

ARTICLE 8: REMEDIES UPON DEFAULT

Upon the occurrence of an Event of Default:

8.1 ACCELERATION
    Lender may declare all amounts outstanding immediately due and payable.

8.2 FORECLOSURE
    Lender may initiate foreclosure proceedings under the deed of trust.

8.3 OTHER REMEDIES
    Lender may pursue any other remedies available at law or in equity.

8.4 LATE CHARGES
    Borrower shall pay a late charge equal to 5% of any payment not received within 10 days of the due date.

8.5 DEFAULT INTEREST
    Upon default, the interest rate shall increase by 2% per annum.

═══════════════════════════════════════════════════════════════════════

ARTICLE 9: GENERAL PROVISIONS

9.1 GOVERNING LAW
    This Agreement shall be governed by the laws of [State].

9.2 ENTIRE AGREEMENT
    This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements.

9.3 AMENDMENTS
    This Agreement may be amended only by written instrument signed by both parties.

9.4 ASSIGNMENT
    Lender may assign its rights under this Agreement. Borrower may not assign without Lender's consent.

9.5 NOTICES
    All notices shall be in writing and delivered to the addresses set forth above.

9.6 WAIVER
    No waiver of any provision shall constitute a waiver of any other provision or future application.

9.7 SEVERABILITY
    If any provision is invalid, the remainder shall remain in full force.

9.8 ATTORNEYS' FEES
    In any action to enforce this Agreement, the prevailing party shall be entitled to reasonable attorneys' fees.

═══════════════════════════════════════════════════════════════════════

IN WITNESS WHEREOF, the parties have executed this Loan Agreement as of the date first written above.

BORROWER:
${data.borrower_name}

By: _______________________________________
Name: [Authorized Signatory]
Title: [Title]
Date: _____________________________________


LENDER:
Saint Vision Group LLC dba SaintSal™

By: _______________________________________
Name: [Authorized Signatory]
Title: [Title]
Date: _____________________________________

═══════════════════════════════════════════════════════════════════════

© ${new Date().getFullYear()} Saint Vision Group LLC. All Rights Reserved.
`.trim()
}
