import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("profile_type").eq("id", user.id).single()

    if (profile?.profile_type !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get all pending applications
    const { data: applications, error } = await supabase
      .from("loan_applications")
      .select("id")
      .eq("status", "submitted")

    if (error) {
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
    }

    // Trigger analysis for each application
    const results = await Promise.all(
      applications.map(async (app) => {
        try {
          const response = await fetch(`${req.nextUrl.origin}/api/underwriting/analyze`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: req.headers.get("cookie") || "",
            },
            body: JSON.stringify({ loan_application_id: app.id }),
          })

          const data = await response.json()
          return { id: app.id, success: response.ok, data }
        } catch (err: any) {
          return { id: app.id, success: false, error: err.message }
        }
      }),
    )

    return NextResponse.json({
      success: true,
      total: applications.length,
      results,
    })
  } catch (error: any) {
    console.error("[v0] Batch analysis error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
