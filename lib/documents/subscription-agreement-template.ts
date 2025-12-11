/**
 * Subscription Agreement Template
 * For SaintSal™ CSREC Investment Offerings
 */

export interface SubscriptionData {
  investor_name: string
  investor_address: string
  investor_email: string
  investor_ssn_ein: string
  investment_amount: number
  offering_name: string
  interest_rate: number
  investment_date: string
}

export function generateSubscriptionAgreement(data: SubscriptionData): string {
  return `
SUBSCRIPTION AGREEMENT

${data.offering_name}

THIS SUBSCRIPTION AGREEMENT (this "Agreement") is entered into as of ${data.investment_date}, by and between:

INVESTOR:
${data.investor_name}
${data.investor_address}
SSN/EIN: ${data.investor_ssn_ein}
Email: ${data.investor_email}

AND

ISSUER:
Saint Vision Group LLC dba SaintSal™
[Company Address]

═══════════════════════════════════════════════════════════════════════

WHEREAS, the Investor desires to purchase a promissory note from the Issuer in connection with the ${data.offering_name} offering described in the Private Placement Memorandum dated [DATE] (the "PPM"); and

WHEREAS, the Issuer desires to accept the Investor's subscription on the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties agree as follows:

═══════════════════════════════════════════════════════════════════════

1. SUBSCRIPTION

The Investor hereby subscribes for and agrees to purchase a secured promissory note in the principal amount of $${data.investment_amount.toLocaleString()} (the "Investment Amount") bearing interest at ${(data.interest_rate * 100).toFixed(2)}% per annum.

2. INVESTMENT REPRESENTATIONS AND WARRANTIES

The Investor hereby represents and warrants to the Issuer that:

a) ACCREDITED INVESTOR STATUS
   The Investor is an "accredited investor" as defined in Rule 501(a) of Regulation D under the Securities Act of 1933, as amended.

b) INVESTMENT PURPOSE
   The Investor is acquiring the note for investment purposes only and not with a view to distribution or resale.

c) RISK ACKNOWLEDGMENT
   The Investor acknowledges that:
   • This investment involves substantial risks
   • There is no public market for the notes
   • The investment is illiquid and must be held until maturity
   • The Investor could lose the entire investment
   • The Investor has carefully reviewed all risk factors in the PPM

d) FINANCIAL SOPHISTICATION
   The Investor has sufficient knowledge and experience in financial and business matters to evaluate the merits and risks of this investment.

e) ABILITY TO BEAR LOSS
   The Investor has adequate means for providing for their current needs and contingencies and can afford to suffer the complete loss of this investment.

f) INFORMATION REVIEW
   The Investor has received and reviewed the PPM and all attachments, and has had the opportunity to ask questions and receive answers concerning the offering.

g) NO RELIANCE ON ISSUER ADVICE
   The Investor has consulted with their own legal, tax, and financial advisors and is not relying on the Issuer for advice regarding the legal, tax, or financial consequences of this investment.

3. PURCHASE PRICE AND PAYMENT

The Investor agrees to pay the Investment Amount by wire transfer to the escrow account designated by the Issuer within 3 business days of the execution of this Agreement.

Wire Instructions:
Bank: [Bank Name]
Account: [Account Number]
Routing: [Routing Number]
Reference: ${data.investor_name} - ${data.offering_name}

4. CLOSING

The closing of the purchase of the note shall occur upon the Issuer's receipt and acceptance of:
   a) This executed Subscription Agreement
   b) Completed Accredited Investor Questionnaire
   c) Wire transfer of the Investment Amount
   d) Such other documents as the Issuer may reasonably require

5. ISSUER'S RIGHT TO REJECT

The Issuer reserves the right to accept or reject this subscription in whole or in part, for any reason or no reason. If this subscription is rejected, all funds received from the Investor will be promptly returned without interest or deduction.

6. TRANSFER RESTRICTIONS

The Investor acknowledges that:
   a) The note has not been registered under the Securities Act
   b) The note cannot be sold, transferred, or assigned except in compliance with the Securities Act
   c) The note certificate will bear a legend restricting transfer

7. CONFIDENTIALITY

The Investor agrees to keep confidential all information received in connection with this offering, except as required by law.

8. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of [State], without regard to its conflicts of law principles.

9. ENTIRE AGREEMENT

This Agreement, together with the PPM and the promissory note, constitutes the entire agreement between the parties and supersedes all prior agreements and understandings.

10. AMENDMENTS

This Agreement may not be amended except by a written instrument signed by both parties.

11. COUNTERPARTS

This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one instrument.

═══════════════════════════════════════════════════════════════════════

IN WITNESS WHEREOF, the parties have executed this Subscription Agreement as of the date first written above.

INVESTOR:

Signature: _________________________________
Name: ${data.investor_name}
Date: _____________________________________


ISSUER:
Saint Vision Group LLC dba SaintSal™

By: _______________________________________
Name: [Authorized Signatory]
Title: [Title]
Date: _____________________________________

═══════════════════════════════════════════════════════════════════════

© ${new Date().getFullYear()} Saint Vision Group LLC. All Rights Reserved.
`.trim()
}
