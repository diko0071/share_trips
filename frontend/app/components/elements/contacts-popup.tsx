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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ApiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";

type Contact = {
    id: string;
    name: string;
    email: string;
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
        const response = await ApiService.get(`/api/user/data/get/${username}/`);
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          setContacts([]);
          setError("Invalid data format received from the server.");
          console.error("Invalid data format:", response.data);
        }
      } catch (err) {
        setContacts([]);
        setError("Failed to fetch contacts. Please try again.");
        console.error("Error fetching contacts:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-md mx-auto">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl">Contacts</DialogTitle>
            <DialogDescription>
              Here are the contacts associated with this user.
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
                  <Card key={contact.id}>
                    <CardHeader>
                      <CardTitle>{contact.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{contact.email}</p>
                    </CardContent>
                  </Card>
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