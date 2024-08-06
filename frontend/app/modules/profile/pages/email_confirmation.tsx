import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyOTP, loginUser } from "../profileAPIs"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner' 
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAccessToken } from "../../../lib/actions"

export function EmailConfirmation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)

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

  const handleConfirmation = async (token: string | null, email: string | null) => {
    if (!token || !email) {
      toast.error("No confirmation token or email found")
      return
    }
    setIsLoading(true)
    try {
      const response = await verifyOTP(email, token)
      if (response.success) {
        toast.success("Email confirmed successfully")
        router.push('/')
      } else {
        toast.error(response.error || "Failed to confirm email")
      }
    } catch (error) {
      toast.error(`Error confirming email: ${error}`)
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
          <CardDescription>We're confirming your email address...</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <p>Please wait while we confirm your email address.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}