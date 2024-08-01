'use client'
import React, { useState, useEffect, useCallback } from "react";
import { sendOTP, verifyOTP } from "../profileAPIs";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"; // {change 1} Import Input component

interface OTPFormProps {
  email: string;
  onVerified: () => void;
}

export default function OTPForm({ email, onVerified }: OTPFormProps) {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    const handleVerifyOTP = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await verifyOTP(email, otp);
            if (result.success) {
                onVerified();
                toast.success("OTP verified successfully");
            } else {
                toast.error(result.error || "Failed to verify OTP");
            }
        } catch (error) {
            toast.error("An error occurred while verifying OTP");
        } finally {
            setIsLoading(false);
        }
    }, [email, otp, onVerified]);

    const handleSendOTP = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await sendOTP(email);
            if (result.success) {
                toast.success("OTP sent successfully");
                setResendDisabled(true);
                setResendTimer(60);
            } else {
                toast.error(result.error || "Failed to send OTP");
            }
        } catch (error) {
            toast.error("An error occurred while sending OTP");
        } finally {
            setIsLoading(false);
        }
    }, [email]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0 && resendDisabled) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [resendTimer, resendDisabled]);

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="text-center text-md w-50"
                />
                <Button
                    variant="outline"
                    onClick={handleSendOTP}
                    disabled={resendDisabled || isLoading}
                >
                    {resendDisabled ? `Resend in ${resendTimer}s` : 'Send OTP'}
                </Button>
                <Button onClick={handleVerifyOTP} disabled={otp.length !== 6 || isLoading}>
                    {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Verify OTP
                </Button>
            </div>
        </div>
    )
}