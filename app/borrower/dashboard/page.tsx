import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BorrowerDashboard } from "@/components/borrower/borrower-dashboard"

export default async function BorrowerDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get borrower profile
  const { data: profile } = await supabase.from("profiles").select("*, borrower_profiles(*)").eq("id", user.id).single()

  // Get properties
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("borrower_id", profile?.borrower_profiles?.[0]?.id || "")
    .order("created_at", { ascending: false })

  // Get loan applications
  const { data: loanApplications } = await supabase
    .from("loan_applications")
    .select("*, property:properties(*)")
    .eq("borrower_id", profile?.borrower_profiles?.[0]?.id || "")
    .order("created_at", { ascending: false })

  return (
    <BorrowerDashboard
      profile={profile}
      properties={properties || []}
      loanApplications={loanApplications || []}
      borrowerProfile={profile?.borrower_profiles?.[0]}
    />
  )
}
