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

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen, username]);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching contacts for username:", username);
      const response = await ApiService.get(`/api/user/data/get/${username}/`);
      console.log("API response:", response);
  
      if (response) {
        console.log("Response structure:", Object.keys(response));
        const userData = response;
        console.log("Raw user data:", userData);
  
        // Преобразуем social_media_links в массив
        const socialMediaLinks = userData.social_media_links
          ? Object.entries(userData.social_media_links).map(([key, value]) => ({
              type: key,
              value: (value as any).value as string, // Приведение типов
              isPreferable: (value as any).isPreferable as boolean, // Приведение типов
            }))
          : [];
  
        // Преобразуем данные пользователя в формат контакта
        const transformedContact = {
          id: userData.id || 'unknown',
          name: userData.name || 'Unknown',
          username: userData.username || '',
          socialMediaLinks: socialMediaLinks,
        };
  
        console.log("Transformed contact:", transformedContact);
        setContacts([transformedContact]);
      } else {
        console.error("No response from API");
        setContacts([]);
        setError("No response received from the server.");
      }
    } catch (err) {
      console.error("Error in fetchContacts:", err);
      setContacts([]);
      setError("Failed to fetch contacts. Please try again.");
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
            {username} prefer to be contacted on those platforms.
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
                          <span className="font-semibold">Platform: {link.type}</span>
                          <Link href={link.value} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon">
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </Link>
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