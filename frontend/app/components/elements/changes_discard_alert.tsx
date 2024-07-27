'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { LoaderCircle, Link as LinkIcon } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ApiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";
import { toast } from "sonner";

type ChangesDiscardAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
};

export function ChangesDiscardAlert({ isOpen, onClose, redirectTo }: ChangesDiscardAlertProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDiscard = () => {
    onClose();
    router.push(redirectTo);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl">Discard Changes</DialogTitle>
          <DialogDescription>
            Are you sure you want to discard changes?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
            <Button variant="outline" onClick={onClose} className="w-full mt-4">
                Cancel
            </Button>
            <Button variant="destructive" onClick={handleDiscard} className="w-full mt-4">
                Discard Changes
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}