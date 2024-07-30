'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePopup } from "./popup-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { loginUser } from "../profileAPIs";

export function LoginForm() {
  const { isLoginFormOpen, closeLoginForm, redirectUrl } = usePopup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async () => {
    setIsLoading(true);
    setError([]);
    const formData = {
      email: email,
      password: password,
    }

    const result = await loginUser(formData);
    if (result.success) {
      setIsLoading(false);
      closeLoginForm();
      window.location.href = redirectUrl;
    } else {
      setError(result.errors || []);
      setIsLoading(false);
    }
  }

    if (!isLoginFormOpen) return null;
  
    return (
      <Dialog open={isLoginFormOpen} onOpenChange={closeLoginForm}>
        <DialogContent className="w-full max-w-sm mx-auto">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl">Login</DialogTitle>
            <DialogDescription>
              Please login to add new trip and start your adventure!
            </DialogDescription>
          </DialogHeader>
          <div className="text-left">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error.map((error, index) => (
                <div key={index} className="text-red-500 text-sm">{error}</div>
              ))}
              <Button type="submit" className="w-full" onClick={submitLogin} disabled={isLoading}>
                {isLoading ? <LoaderCircle className="animate-spin" /> : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline" onClick={closeLoginForm}>
                Sign up
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }