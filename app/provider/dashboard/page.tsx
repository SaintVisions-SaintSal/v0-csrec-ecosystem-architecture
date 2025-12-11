import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProviderDashboard } from "@/components/provider/provider-dashboard"

export default async function ProviderDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.profile_type !== "property_provider") {
    redirect("/dashboard")
  }

  // Fetch provider profile
  const { data: providerProfile } = await supabase
    .from("property_provider_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  // Fetch properties submitted by this provider
  const { data: properties } = await supabase
    .from("properties")
    .select("*, borrower:borrower_profiles(organization_name)")
    .eq("provider_id", providerProfile?.id || "")
    .order("created_at", { ascending: false })

  return <ProviderDashboard profile={profile} providerProfile={providerProfile} properties={properties || []} />
}
