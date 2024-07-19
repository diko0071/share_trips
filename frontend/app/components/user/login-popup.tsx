'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react";
import Link from "next/link"
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

export function LoginForm() {
    const { isLoginFormOpen, closeLoginForm } = usePopup();
  
    if (!isLoginFormOpen) return null;
  
    return (
      <Dialog open={isLoginFormOpen} onOpenChange={closeLoginForm}>
        <DialogContent className="w-full max-w-sm mx-auto">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl">Login</DialogTitle>
            <DialogDescription>
              Enter your email below to login to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="text-left">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
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