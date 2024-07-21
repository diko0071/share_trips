import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { toast } from "sonner"
import TripCard from "../elements/trip-card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ApiService from "../../services/apiService";

type TripDetail = {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string | null;
  month: string;
  isFlexible: boolean;
  createdBy: string;
  createdByPhoto: string;
  createdByPreferences: string;
};

type TripData = {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  dateRange: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string | null;
  month: string;
  isFlexible: boolean;
  created_by_name: string;
  isAvailable: boolean;
}

const USER_DETAILS = {
  preferencesTitle: "Co-Liver's preferences",
  preferencesDescription: `Looking for a non-smoker, pet-friendly co-liver who values cleanliness and enjoys a quiet living environment. Prefer someone who is respectful of shared spaces and has a similar lifestyle.`,
  splitOption: "$1000",
  contactName: "Dmitry Korzhov"
};

export default function TripDetail() {
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    async function fetchListingDetail() {
      try {
        const response = await ApiService.get('/api/trip/1');
        if (response) {
          const data: TripDetail = {
            id: response.id,
            title: response.name,
            imgSrc: response.image1,
            alt: response.name,
            country: response.country,
            city: response.city,
            description: response.description,
            minBudget: parseFloat(response.budget),
            url: response.url,
            month: response.month.charAt(0).toUpperCase() + response.month.slice(1),
            isFlexible: response.is_flexible,
            createdBy: response.created_by_name,
            createdByPhoto: response.photo,
            createdByPreferences: response.user_coliver_preferences,
          };
          setTripDetails(data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }

    fetchListingDetail();
  }, []);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await ApiService.get('/api/trip/')
        if (Array.isArray(response)) {
          const data = response.map((listing: any) => ({
            id: listing.id,
            title: listing.name,
            imgSrc: listing.image1,
            alt: listing.name,
            country: listing.country,
            city: listing.city,
            description: listing.description,
            minBudget: parseFloat(listing.budget),
            url: listing.url,
            month: listing.month.charAt(0).toUpperCase() + listing.month.slice(1),
            isFlexible: listing.is_flexible,
            created_by_name: listing.created_by_name,
          }))
          setTrips(data as TripData[])
        } else {
          console.error("No data in response")
        }
      } catch (error) {
        console.error("Error fetching listings:", error)
      }
    }

    fetchTrips()
  }, [])

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copied to clipboard", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <Link href="/listings">
          <Button variant="ghost" size="icon" className="flex items-center gap-2">
            <MoveLeft className="w-4 h-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="flex items-center gap-2" onClick={handleShareClick}>
          <Share className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <img
            src={tripDetails?.imgSrc || "/photo2.png"}
            alt={tripDetails?.alt || "Trip Image"}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full aspect-[3/2]"
          />
        </div>
        <div>
          <div className="grid gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">{tripDetails?.title}</h1>
              <div className="flex gap-2">
                <Badge variant="outline" className="mb-4">
                  {tripDetails?.country}, {tripDetails?.city}
                </Badge>
                <Badge variant="outline" className="mb-4">
                  {tripDetails?.month}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {tripDetails?.description}
              </p>
            </div>
            <div className="flex gap-4">
            </div>
            <Card className="flex items-center p-4 gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">{USER_DETAILS.preferencesTitle}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tripDetails?.createdByPreferences}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <HoverCard>
                        <HoverCardTrigger className="hover:cursor-pointer">
                          <CircleHelp className="inline w-4 h-4 mr-1.5" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>The number that {tripDetails?.createdBy} is ready to pay for the trip.</p>
                        </HoverCardContent>
                      </HoverCard>
                      Available Budget: <b>{USER_DETAILS.splitOption}</b>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Open Contacts
                      </Button>
                      <Button variant="link" size="sm" className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={tripDetails?.createdByPhoto} />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium">{tripDetails?.createdBy}</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tighter">Other trips you might like</h2>
        <div className="border-t border-gray-200 my-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
            imgSrc={trip.imgSrc}
            alt={trip.alt}
            showUser={true}
            country={trip.country}
            city={trip.city}
            description={trip.description}
            minBudget={trip.minBudget}
            url={trip.url || ""}
            month={trip.month}
            createdBy={trip.created_by_name}
          />
        ))}
        </div>
      </div>
    </div>
  )
}