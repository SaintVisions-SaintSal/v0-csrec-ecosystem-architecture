import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InvestorDashboard } from "@/components/investor/investor-dashboard"

export default async function InvestorDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get investor profile
  const { data: profile } = await supabase.from("profiles").select("*, investor_profiles(*)").eq("id", user.id).single()

  if (!profile?.investor_profiles || profile.investor_profiles.length === 0) {
    redirect("/auth/onboarding?role=investor")
  }

  const investorProfileId = profile.investor_profiles[0].id

  // Get investments with loan details
  const { data: investments } = await supabase
    .from("investments")
    .select(
      `
      *,
      loan_application:loan_applications(
        *,
        property:properties(*)
      )
    `,
    )
    .eq("investor_id", investorProfileId)
    .order("created_at", { ascending: false })

  // Get recent transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .in("investment_id", investments?.map((i) => i.id) || [])
    .order("transaction_date", { ascending: false })
    .limit(10)

  return <InvestorDashboard profile={profile} investments={investments || []} transactions={transactions || []} />
}
