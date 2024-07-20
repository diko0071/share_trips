import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ListingCard from "../elements/trip-card" 
import { useEffect, useState } from "react";
import { toast } from "sonner"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const initialListings = [
  {
    id: 5,
    title: "Charming Cottage in the Countryside",
    imgSrc: "/photo2.png",
    alt: "Apartment 5",
    dateRange: "Sep 5 - Sep 12",
    country: "USA",
    city: "Nashville",
    description: "A charming cottage in the peaceful countryside.",
    minBudget: 130,
    url: "https://example.com/listing/5",
    month: "September",
    isFlexible: true,
    createdBy: "Charlie Green"
  },
  {
    id: 7,
    title: "Cozy Apartment in Downtown",
    imgSrc: "/photo3.png",
    alt: "Apartment 7",
    dateRange: "Nov 10 - Nov 17",
    country: "USA",
    city: "New York",
    description: "A cozy apartment in the bustling downtown area.",
    minBudget: 180,
    url: "https://example.com/listing/7",
    month: "November",
    isFlexible: true,
    createdBy: "Eve Adams"
  },
  {
    id: 8,
    title: "Penthouse Suite with City View",
    imgSrc: "/photo.png",
    alt: "Apartment 8",
    dateRange: "Dec 20 - Dec 27",
    country: "USA",
    city: "Seattle",
    description: "A penthouse suite with a stunning city view.",
    minBudget: 250,
    url: "https://example.com/listing/8",
    month: "December",
    isFlexible: false,
    createdBy: "Frank White"
  },
]


const TRIP_DETAILS = {
  title: "Explore the Wonders of Italy",
  location: "Italy, Milan",
  date: "June, 2024",
  description: `Join us on an unforgettable journey through the historic cities and breathtaking landscapes of Italy. From
  the canals of Venice to the rolling hills of Tuscany, this trip will immerse you in the rich culture and
  stunning beauty of this remarkable country.`
};

const USER_DETAILS = {
  preferencesTitle: "Co-Liver's preferences",
  preferencesDescription: `Looking for a non-smoker, pet-friendly co-liver who values cleanliness and enjoys a quiet living environment. Prefer someone who is respectful of shared spaces and has a similar lifestyle.`,
  splitOption: "$1000",
  contactName: "Dmitry Korzhov"
};


export default function Component() {
  const [listings, setListings] = useState(initialListings);

  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
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
            src="/photo2.png"
            alt="Trip Image"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full aspect-[3/2]"
          />
        </div>
        <div>
          <div className="grid gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">{TRIP_DETAILS.title}</h1>
              <div className="flex gap-2">
                <Badge variant="outline" className="mb-4">
                  {TRIP_DETAILS.location}
                </Badge>
                <Badge variant="outline" className="mb-4">
                  {TRIP_DETAILS.date}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {TRIP_DETAILS.description}
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
                      {USER_DETAILS.preferencesDescription}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <HoverCard>
                        <HoverCardTrigger className="hover:cursor-pointer">
                          <CircleHelp className="inline w-4 h-4 mr-1.5" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>The number that {USER_DETAILS.contactName} is ready to pay for the trip.</p>
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
                          <AvatarImage src="/dima.jpeg" />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium">{USER_DETAILS.contactName}</p>
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
        <div className="flex flex-col md:flex-row gap-6 mt-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            imgSrc={listing.imgSrc}
            alt={listing.alt}
            showUser={true}
            country={listing.country}
            city={listing.city}
            description={listing.description}
            minBudget={listing.minBudget}
            url={listing.url}
            month={listing.month}
            createdBy={listing.createdBy}
          />
        ))}
        </div>
      </div>
    </div>
  )
}