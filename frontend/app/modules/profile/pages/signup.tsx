import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { registerUser, sendOTP, verifyOTP } from "../profileAPIs"
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

export function Signup() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const formData = {
      email: email,
      password1: password,
      password2: confirmPassword
    }

    try {
      setIsLoading(true)
      const registerResult = await registerUser(formData)
      if (registerResult.success) {
        const otpResult = await sendOTP(email)
        if (otpResult.success) {
          setShowConfirmation(true)
          setIsLoading(false)
          toast.success("Registration successful. OTP sent to your email")
        } else {
          toast.error(otpResult.error || "Failed to send OTP")
        }
      } else {
        setErrors(registerResult.errors || [])
        toast.error(`Registration failed: ${registerResult.errors?.join(', ')}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    const result = await sendOTP(email)
    if (result.success) {
      setResendTimer(120)
      toast.success("OTP sent again")
    } else {
      toast.error(result.error || "Failed to resend OTP")
    }
  }

  const handleConfirmation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await verifyOTP(email, confirmationCode)
    if (result.success) {
      toast.success("OTP verified successfully")
      setIsLoading(false)
      router.push('/register')
    } else {
      toast.error(result.error || "Failed to verify OTP")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resendTimer])

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password1">Password</Label>
              <Input
                id="password1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password2">Confirm Password</Label>
              <Input
                id="password2"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {!showConfirmation && (
              <Button type="submit" className="w-full">
                {isLoading ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : "Create an account"}
              </Button>
            )}
          </div>
        </form>
        {showConfirmation && (
          <form onSubmit={handleConfirmation} className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="confirmationCode">Confirmation Code</Label>
                <Input
                  id="confirmationCode"
                  type="text"
                  placeholder="Enter confirmation code"
                  required
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
                {resendTimer > 0 ? (
                  <p className="text-[14px] text-center text-gray-500">
                    Resend again after {resendTimer} seconds
                  </p>
                ) : (
                  <p
                    className="text-[14px] text-center text-blue-500 cursor-pointer"
                    onClick={handleResendCode}>
                    Resend code
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : "Finish Registration"}
              </Button>
            </div>
          </form>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}