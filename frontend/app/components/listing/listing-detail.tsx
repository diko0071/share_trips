import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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
  return (
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
  )
}