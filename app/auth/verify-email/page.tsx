import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image src="/saintsal-logo.png" alt="SaintSal™" width={120} height={120} className="object-contain" />
          </div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Check Your Email</CardTitle>
              <CardDescription className="text-muted-foreground">
                We&apos;ve sent you a verification link
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-foreground">
                Please check your email and click the verification link to activate your SaintSal™ account.
              </p>
              <p className="text-sm text-muted-foreground">If you don&apos;t see the email, check your spam folder.</p>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/auth/login">Return to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
