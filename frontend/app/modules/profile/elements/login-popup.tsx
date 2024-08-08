'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePopup } from "./popup-context";
import { toast } from "sonner";
import { loginUser, handleGoogleLogin } from "../profileAPIs";

export function LoginForm() {
  const { isLoginFormOpen, closeLoginForm, redirectUrl, isLoading, setLoading, isGoogleLoading, setGoogleLoading } = usePopup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();

  const submitLogin = async () => {
    setLoading(true);
    setError([]);
    const formData = {
      email: email,
      password: password,
    }

    const result = await loginUser(formData);
    if (result.success) {
      setLoading(false);
      closeLoginForm();
      window.location.href = redirectUrl;
    } else {
      setError(result.errors || []);
      setLoading(false);
    }
  }

  const handleGoogleLoginClick = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const responseType = process.env.NEXT_PUBLIC_GOOGLE_RESPONSE_TYPE;
    const accessType = process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TYPE;
    const prompt = process.env.NEXT_PUBLIC_GOOGLE_PROMPT;

    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=${prompt}&response_type=${responseType}&client_id=${clientId}&scope=${scope}&access_type=${accessType}`;

    window.location.href = googleOAuthUrl;
  };

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      if (code && window.location.pathname !== '/register') {
        setGoogleLoading(true);
        try {
          const result = await handleGoogleLogin(code);
          if (result.success) {
            window.location.href = redirectUrl;
          } else {
            toast.error(result.errors?.[0] || 'An error occurred during Google login', {
              action: {
                label: "Close",
                onClick: () => toast.dismiss(),
              },
            });
          }
        } finally {
          setGoogleLoading(false);
          urlParams.delete('code');
          window.history.replaceState({}, document.title, `${window.location.pathname}?${urlParams.toString()}`);
        }
      }
    };
  
    handleGoogleCallback();
  }, []);

  if (!isLoginFormOpen && !isLoading && !isGoogleLoading) return null;

  const isFormDisabled = isLoading || isGoogleLoading;

  return (
    <Dialog open={isLoginFormOpen || isLoading || isGoogleLoading} onOpenChange={closeLoginForm}>
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
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)} disabled={isFormDisabled} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} disabled={isFormDisabled} />
            </div>
            {error.map((error, index) => (
              <div key={index} className="text-red-500 text-sm">{error}</div>
            ))}
            <Button type="submit" className="w-full" onClick={submitLogin} disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Login'}
            </Button>
            <Button type="button" variant="outline" className="w-full mt-2" onClick={handleGoogleLoginClick} disabled={isGoogleLoading}>
              {isGoogleLoading ? <LoaderCircle className="animate-spin" /> : (
                <>
                  <Image src="/google.svg" alt="Google Icon" width={20} height={20} className="mr-2" />
                  Login with Google
                </>
              )}
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