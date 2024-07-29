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

interface SocialMediaLink {
  type: string;
  value: string;
  isPreferable: boolean;
}

type Contact = {
  id: string;
  name: string;
  username: string; 
  socialMediaLinks: SocialMediaLink[];
};

type ContactsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
};

export function ContactsPopup({ isOpen, onClose, username }: ContactsPopupProps) {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
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
      fetchContacts();
    }
  }, [isOpen, username]);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.get(`/api/user/data/get/${username}/`);
  
      if (response) {
        const userData = response;
  
        const socialMediaLinks = userData.social_media_links
          ? Object.entries(userData.social_media_links).map(([key, value]) => ({
              type: key,
              value: (value as any).value as string,
              isPreferable: (value as any).isPreferable as boolean,
            }))
          : [];
            
        const transformedContact = {
          id: userData.id || 'unknown',
          name: userData.name || 'Unknown',
          username: userData.username || '',
          socialMediaLinks: socialMediaLinks,
        };
  
        setContacts([transformedContact]);
      } else {
        setContacts([]);
        toast.error("No response received from the server.", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      }
    } catch (err) {
      setContacts([]);
      toast(`Failed to fetch contacts: ${err}`, {
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
          ) : contacts === null ? (
            <div className="text-sm text-gray-500">Loading contacts...</div>
          ) : contacts.length > 0 ? (
            <div className="grid gap-4">
              {contacts.map((contact) => (
                contact.socialMediaLinks
                  .filter(link => link.isPreferable)
                  .map((link, index) => (
                    <Card key={index} className="">
                      <CardContent className="flex justify-between items-center py-4">
                        <span className="font-semibold">
                          {link.type.toLowerCase() === 'email' ? 'Email' :
                           link.type.toLowerCase() === 'phone' ? 'Phone' :
                           link.type}
                        </span>
                        <a href={formatLink(link.type, link.value)} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="icon">
                            <LinkIcon className="w-4 h-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No contacts found.</div>
          )}
          <Button onClick={onClose} className="w-full mt-4">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}