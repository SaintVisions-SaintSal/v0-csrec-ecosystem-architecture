import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LoanApplicationForm } from "@/components/borrower/loan-application-form"

export default async function ApplyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get borrower profile
  const { data: profile } = await supabase.from("profiles").select("*, borrower_profiles(*)").eq("id", user.id).single()

  // Get borrower's properties
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("borrower_id", profile?.borrower_profiles?.[0]?.id || "")
    .order("created_at", { ascending: false })

  return <LoanApplicationForm borrowerProfile={profile?.borrower_profiles?.[0]} properties={properties || []} />
}
