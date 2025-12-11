import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("profile_type").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/onboarding")
  }

  // Redirect to appropriate dashboard
  if (profile.profile_type === "investor") {
    redirect("/investor/dashboard")
  } else if (profile.profile_type === "borrower") {
    redirect("/borrower/dashboard")
  } else if (profile.profile_type === "property_provider") {
    redirect("/provider/dashboard")
  }

  // Default fallback
  redirect("/auth/login")
}
