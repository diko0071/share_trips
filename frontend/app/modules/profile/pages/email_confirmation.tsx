import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyOTP, loginUser } from "../profileAPIs"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner' 
import { LoaderCircle, MailCheck, TriangleAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAccessToken, setIsEmailVerified } from "../../../lib/actions"

function EmailConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'already-verified' | 'error'>('pending')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const fetchToken = async () => {
      const token = searchParams.get('token')
      const email = searchParams.get('email')
      setToken(token)
      setEmail(email)
      const accessToken = await getAccessToken()
      setAccessToken(accessToken)
      if (!accessToken) {
        setShowLoginForm(true)
      } else {
        handleConfirmation(token, email)
      }
    }
    fetchToken()
  }, [searchParams])

  const handleConfirmation = async (otp: string | null, email: string | null) => {
    if (!otp || !email) {
      toast.error("No confirmation token or email found")
      return
    }
    setIsLoading(true)
    try {
      const response = await verifyOTP(email, otp)
      if (response.success) {
        setVerificationStatus('success')
        setStatusMessage("Email confirmed successfully")
        toast.success("Email confirmed successfully", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        })
        await setIsEmailVerified(true)
      } else if (response.error === 'Email already verified') {
        setVerificationStatus('already-verified')
        setStatusMessage("Email already verified")
        toast.info("Email already verified", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        })
        await setIsEmailVerified(true)
      } else {
        setVerificationStatus('error')
        setStatusMessage(response.error || "Failed to confirm email")
        toast.error(response.error || "Failed to confirm email", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        })
      }
    } catch (error) {
      setVerificationStatus('error')
      setStatusMessage(`Error confirming email: ${error}`)
      toast.error(`Error confirming email: ${error}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)
    try {
      const result = await loginUser({ email: email!, password })
      if (result.success) {
        setShowLoginForm(false)
        handleConfirmation(token, email)
      } else {
        setLoginError(result.errors?.[0] || "Login failed")
      }
    } catch (error) {
      setLoginError(`Error during login: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (showLoginForm) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login to Confirm Email</CardTitle>
            <CardDescription>Please login to complete the email confirmation process.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email || ''} disabled />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                Login & Confirm Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Confirmation</CardTitle>
          <CardDescription>
            {verificationStatus === 'pending' ? "We're confirming your email address..." : statusMessage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              {verificationStatus === 'success' && (
                <>
                  <MailCheck className="text-green-500 w-16 h-16" />
                  <p className="text-center">Email verified successfully!</p>
                </>
              )}
              {verificationStatus === 'already-verified' && (
                <>
                  <TriangleAlert className="text-blue-500 w-16 h-16" />
                  <p className="text-center">Email was already verified.</p>
                </>
              )}
              {verificationStatus === 'error' && (
                <>
                  <TriangleAlert className="text-red-500 w-16 h-16" />
                  <p className="text-center">{statusMessage}</p>
                </>
              )}
              {verificationStatus !== 'pending' && (
                <Button onClick={() => router.push('/')} className="mt-4">
                  Continue to Homepage
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function EmailConfirmation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailConfirmationContent />
    </Suspense>
  )
}