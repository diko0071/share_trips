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
import { fetchUserProfile, UserProfileType, type SocialMediaLink, type UserProfileUpdateType } from "../../profile/profileAPIs";
import ApiService from "../../../services/apiService";
import { handleLogin } from "../../../lib/actions";
import { toast } from "sonner";

type ContactsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
};

export function ContactsPopup({ isOpen, onClose, username }: ContactsPopupProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatLink = (platform: string, value: string) => {
    switch (platform.toLowerCase()) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value.replace(/\D/g, '')}`;
      default:
        return value;
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen, username]);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await fetchUserProfile(username);
      setUserProfile(profile);
    } catch (err) {
      setUserProfile(null);
      toast(`Failed to fetch user profile: ${err}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl">Contacts</DialogTitle>
          <DialogDescription>
            {username} prefers to be contacted on these platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="text-left">
          {isLoading ? (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : userProfile === null ? (
            <div className="text-sm text-gray-500">No profile found.</div>
          ) : (
            <div className="grid gap-4">
              {Object.entries(userProfile.social_media_links)
                .filter(([_, link]) => link.isPreferable)
                .map(([platform, link], index) => (
                  <Card key={index} className="">
                    <CardContent className="flex justify-between items-center py-4">
                      <span className="font-semibold">
                        {platform.toLowerCase() === 'email' ? 'Email' :
                         platform.toLowerCase() === 'phone' ? 'Phone' :
                         platform}
                      </span>
                      <a href={formatLink(platform, link.value)} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
          <Button onClick={onClose} className="w-full mt-4">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}